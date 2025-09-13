import { createAsyncThunk, createEntityAdapter, createSlice,type PayloadAction } from "@reduxjs/toolkit";

import { collection, doc, documentId, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore";
import type { IProject } from "../interface/IProject";
import type { IProjectState } from "../interface/IProjectState";
import { db } from "../config/firebase";
import type { RootState } from "../store/store";
import type { IFilters } from "../interface/IFilters";

export const projectAdapter = createEntityAdapter<IProject, string>({
    selectId: (project) => project.id
});

const initialState = projectAdapter.getInitialState<IProjectState>({
    ids: [],
    entities: {},
    status: 'idle',
    error: null,
    selectedProjectId: null,
    filters: {
        tags: ["Front-End","React"],
        busqueda:""
    },
    pagination: {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: 0
    },
    lastVisible: null,
});

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const { filters, pagination, lastVisible } = state.projects;
        const { itemsPerPage } = pagination;
        try {
            const queryConstraints: QueryConstraint[] = [];
            const productsCollection = collection(db, 'projects');

            //Filtros(revisar si estan bien)
            if (filters.tags) {
                queryConstraints.push(where('tags', '==', filters.tags));
            }
            if (filters.busqueda.length > 0) {
                queryConstraints.push(where('titulo', '==', filters.busqueda));
            }


            // switch (filters.sortBy) {
            //     case 'price_asc':
            //         queryConstraints.push(orderBy('price', 'asc'));
            //         if (lastVisible) {
            //             queryConstraints.push(startAfter(lastVisible.data()!.price));
            //         }
            //         break;
            //     case 'price_desc':
            //         queryConstraints.push(orderBy('price', 'desc'));
            //         if (lastVisible) {
            //             queryConstraints.push(startAfter(lastVisible.data()!.price));
            //         }
            //         break;
            //     case 'rating_desc':
            //         queryConstraints.push(orderBy('rating.rate', 'desc'));
            //         if (lastVisible) {
            //             queryConstraints.push(startAfter(lastVisible.data()!.rating.rate));
            //         }
            //         break;
            //     default:
            //         queryConstraints.push(orderBy(documentId(), 'asc'));
            //         if (lastVisible) {
            //             queryConstraints.push(startAfter(lastVisible.id));
            //         }
            //         break;
            // }

            queryConstraints.push(limit(itemsPerPage));

            const q = query(productsCollection, ...queryConstraints);

            const totalDocs = await getCountFromServer(query(productsCollection, ...queryConstraints.filter(c => c.type !== 'limit')));
            const total = pagination.totalItems > 0 ? pagination.totalItems : totalDocs.data().count;

            const queryDocs = await getDocs(q);
            const lastVisibleDoc = queryDocs.docs[queryDocs.docs.length - 1];

            const projects = queryDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as IProject[];
            return {
                projects,
                total,
                lastVisibleDoc
            }
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectById',
    async (projecttId: string) => {
        try {
            const projectRef = doc(db, 'projects', projecttId);
            const projectDoc = await getDoc(projectRef);
            if (!projectDoc.exists()) {
                throw new Error("Producto no encontrado");
            }
            return { id: projectDoc.id, ...projectDoc.data() } as IProject;
        } catch (error) {
            console.log(error);
        }
    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<IFilters>) => {
            state.filters = action.payload;
            state.pagination.currentPage = 1;
            state.lastVisible = null;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        clearProjects: (state) => {
            projectAdapter.removeAll(state);
            state.lastVisible = null;
            state.pagination.currentPage = 1;
        },
        setSelectedProject: (state, action: PayloadAction<string>) => {
            state.selectedProjectId = action.payload;
        },
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            projectAdapter.setAll(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    // productAdapter.setAll(state, action.payload);
                    projectAdapter.addMany(state, action.payload.projects);
                    state.pagination.totalItems = action.payload.total;
                    state.lastVisible = action.payload.lastVisibleDoc;
                }
                state.error = null;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error cargando los productos';
            })
            .addCase(fetchProjectById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    projectAdapter.upsertOne(state, action.payload);
                    state.selectedProjectId = action.payload.id;
                }
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error consultando el producto';
            })
    }
});

export const {
    selectAll: selectAllProjects,
    selectById: selectProjectById
} = projectAdapter.getSelectors<RootState>(
    (state) => state.projects
)

export const selectSelectedProject = (state: RootState) =>
    state.projects.selectedProjectId ?
        selectProjectById(state, state.projects.selectedProjectId) : null;

export const selectProjectStatus = (state: RootState) => state.projects.status;
export const selectProjectError = (state: RootState) => state.projects.error;
export const selectFilters = (state: RootState) => state.projects.filters;
export const selectPaginationInfo = (state: RootState) => ({
    ...state.projects.pagination,
    totalPages: Math.ceil(state.projects.pagination.totalItems / state.projects.pagination.itemsPerPage)
})


export const selectAllTags = (state: RootState) => {
    const allProjects = selectAllProjects(state);
    return [...new Set(allProjects.map(p => p.tags))];
}

export const { setSelectedProject, setProjects, setFilters, clearProjects, setCurrentPage } = projectsSlice.actions;
export default projectsSlice.reducer;

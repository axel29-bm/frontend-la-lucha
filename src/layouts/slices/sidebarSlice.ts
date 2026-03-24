/**
 * Redux Slice: sidebarSlice
 * - Maneja el estado global del sidebar (visible o no, expandido o no).
 * - Permite alternar su visibilidad y modo "desplegable" (unfoldable).
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
  sidebarShow: boolean
  sidebarUnfoldable: boolean
}

const initialState: SidebarState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    /** Actualiza la visibilidad del sidebar (mostrar u ocultar). */
    setSidebarShow(state, action: PayloadAction<boolean>) {
      state.sidebarShow = action.payload
    },
    /** Cambia si el sidebar es plegable/desplegable en tamaño. */
    setSidebarUnfoldable(state, action: PayloadAction<boolean>) {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { setSidebarShow, setSidebarUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer

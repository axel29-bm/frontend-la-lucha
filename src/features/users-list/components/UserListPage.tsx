import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPen,
  cilSearch,
  cilTrash,
  cilUser,
  cilUserPlus,
  cilX,
  cilCheck,
  cilGroup,
  cilPhone,
  cilEnvelopeClosed,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import type { ManagedUser, UpdateUserPayload } from '../types/usersTypes'

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

/** Genera las iniciales del usuario para el avatar */
const getInitials = (first: string, last: string) =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()

/** Formatea una fecha ISO a DD/MM/YYYY */
const formatDate = (iso?: string) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                 */
/* ------------------------------------------------------------------ */

/**
 * Página de gestión de usuarios — Temática La Lucha.
 * Permite ver, buscar, editar y eliminar usuarios.
 */
const UserListPage: React.FC = () => {
  const navigate = useNavigate()
  const { users, loading, error, fetchUsers, editUser, removeUser } = useUsers()

  /* --- estado local --- */
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  /* --- modal ver detalle --- */
  const [viewUser, setViewUser] = useState<ManagedUser | null>(null)

  /* --- modal editar --- */
  const [editTarget, setEditTarget] = useState<ManagedUser | null>(null)
  const [editForm, setEditForm] = useState<UpdateUserPayload>({})
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)

  /* --- modal eliminar --- */
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  /* --- carga inicial --- */
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  /* --- filtrado --- */
  const filtered = users.filter((u) => {
    const term = searchTerm.toLowerCase()
    return (
      u.first_name.toLowerCase().includes(term) ||
      u.last_name.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  /* --- handlers editar --- */
  const openEdit = (user: ManagedUser) => {
    setEditTarget(user)
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone ?? '',
      role_id: user.role.id,
      is_active: user.is_active,
    })
    setEditError(null)
  }

  const handleEditSave = async () => {
    if (!editTarget) return
    setEditLoading(true)
    setEditError(null)
    const ok = await editUser(editTarget.id, editForm)
    setEditLoading(false)
    if (ok) {
      setEditTarget(null)
    } else {
      setEditError('No se pudo actualizar el usuario.')
    }
  }

  /* --- handlers eliminar --- */
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    await removeUser(deleteTarget.id)
    setDeleteLoading(false)
    setDeleteTarget(null)
  }

  /* ---------------------------------------------------------------- */
  return (
    <>
      {/* ─── Cabecera ─── */}
      <CCard className="mb-4 lucha-users-header">
        <CCardBody className="p-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="lucha-users-icon-wrap">
                <CIcon icon={cilGroup} size="xl" className="text-white" />
              </div>
              <div>
                <h4 className="lucha-users-title mb-0">Gestión de Usuarios</h4>
                <p className="lucha-users-subtitle mb-0">
                  Administra los accesos al sistema de La Lucha
                </p>
              </div>
            </div>
            <CButton
              className="lucha-btn-submit px-4"
              onClick={() => navigate('/create-users')}
            >
              <CIcon icon={cilUserPlus} className="me-2" />
              Registrar usuario
            </CButton>
          </div>
        </CCardBody>
      </CCard>

      {/* ─── Barra de búsqueda y stats ─── */}
      <CRow className="mb-3 align-items-center">
        <CCol xs={12} md={5}>
          <CInputGroup>
            <CInputGroupText className="lucha-search-icon">
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              placeholder="Buscar por nombre, usuario o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lucha-search-input"
            />
          </CInputGroup>
        </CCol>
        <CCol xs={12} md={7} className="d-flex gap-3 justify-content-md-end mt-2 mt-md-0 flex-wrap">
          <div className="lucha-stat-chip">
            <span className="lucha-stat-num">{users.length}</span>
            <span className="lucha-stat-label">Total</span>
          </div>
          <div className="lucha-stat-chip lucha-stat-chip--active">
            <span className="lucha-stat-num">{users.filter((u) => u.is_active).length}</span>
            <span className="lucha-stat-label">Activos</span>
          </div>
          <div className="lucha-stat-chip lucha-stat-chip--inactive">
            <span className="lucha-stat-num">{users.filter((u) => !u.is_active).length}</span>
            <span className="lucha-stat-label">Inactivos</span>
          </div>
        </CCol>
      </CRow>

      {/* ─── Contenido principal ─── */}
      <CCard className="lucha-users-table-card">
        <CCardBody className="p-0">
          {/* Error global */}
          {error && (
            <div className="p-3">
              <CAlert color="danger" className="mb-0">{error}</CAlert>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center p-5">
              <CSpinner style={{ color: 'var(--lucha-red)' }} />
              <span className="ms-3 text-body-secondary">Cargando usuarios...</span>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <CTable className="lucha-users-table mb-0" align="middle" hover>
                  <CTableHead className="lucha-users-thead">
                    <CTableRow>
                      <CTableHeaderCell style={{ width: 50 }}>#</CTableHeaderCell>
                      <CTableHeaderCell>Usuario</CTableHeaderCell>
                      <CTableHeaderCell className="d-none d-md-table-cell">Email</CTableHeaderCell>
                      <CTableHeaderCell className="d-none d-lg-table-cell">Teléfono</CTableHeaderCell>
                      <CTableHeaderCell className="d-none d-md-table-cell">Rol</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                      <CTableHeaderCell className="d-none d-lg-table-cell">Registro</CTableHeaderCell>
                      <CTableHeaderCell className="text-center" style={{ width: 120 }}>
                        Acciones
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {paginated.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan={8}>
                          <div className="lucha-empty-state">
                            <CIcon icon={cilGroup} size="3xl" className="lucha-empty-icon" />
                            <p className="mt-2 mb-0">No se encontraron usuarios.</p>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      paginated.map((user, idx) => (
                        <CTableRow key={user.id} className="lucha-users-row">
                          {/* # */}
                          <CTableDataCell className="text-body-secondary" style={{ fontSize: '0.8rem' }}>
                            {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                          </CTableDataCell>

                          {/* Avatar + nombre */}
                          <CTableDataCell>
                            <div className="d-flex align-items-center gap-2">
                              <div className="lucha-avatar">
                                {user.picture ? (
                                  <img src={user.picture} alt={user.first_name} />
                                ) : (
                                  <span>{getInitials(user.first_name, user.last_name)}</span>
                                )}
                              </div>
                              <div>
                                <div className="lucha-user-name">
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className="lucha-user-username">@{user.username}</div>
                              </div>
                            </div>
                          </CTableDataCell>

                          {/* Email */}
                          <CTableDataCell className="d-none d-md-table-cell text-body-secondary" style={{ fontSize: '0.875rem' }}>
                            {user.email}
                          </CTableDataCell>

                          {/* Teléfono */}
                          <CTableDataCell className="d-none d-lg-table-cell text-body-secondary" style={{ fontSize: '0.875rem' }}>
                            {user.phone ?? '—'}
                          </CTableDataCell>

                          {/* Rol */}
                          <CTableDataCell className="d-none d-md-table-cell">
                            <CBadge className="lucha-badge-role">{user.role.name}</CBadge>
                          </CTableDataCell>

                          {/* Estado */}
                          <CTableDataCell className="text-center">
                            <CBadge className={user.is_active ? 'lucha-badge-active' : 'lucha-badge-inactive'}>
                              {user.is_active ? 'Activo' : 'Inactivo'}
                            </CBadge>
                          </CTableDataCell>

                          {/* Fecha */}
                          <CTableDataCell className="d-none d-lg-table-cell text-body-secondary" style={{ fontSize: '0.8rem' }}>
                            {formatDate(user.created_at)}
                          </CTableDataCell>

                          {/* Acciones */}
                          <CTableDataCell className="text-center">
                            <div className="d-flex gap-1 justify-content-center">
                              <CTooltip content="Ver detalle">
                                <CButton
                                  size="sm"
                                  className="lucha-action-btn lucha-action-btn--view"
                                  onClick={() => setViewUser(user)}
                                >
                                  <CIcon icon={cilUser} />
                                </CButton>
                              </CTooltip>
                              <CTooltip content="Editar">
                                <CButton
                                  size="sm"
                                  className="lucha-action-btn lucha-action-btn--edit"
                                  onClick={() => openEdit(user)}
                                >
                                  <CIcon icon={cilPen} />
                                </CButton>
                              </CTooltip>
                              <CTooltip content="Eliminar">
                                <CButton
                                  size="sm"
                                  className="lucha-action-btn lucha-action-btn--delete"
                                  onClick={() => setDeleteTarget(user)}
                                >
                                  <CIcon icon={cilTrash} />
                                </CButton>
                              </CTooltip>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center py-3">
                  <CPagination aria-label="Usuarios">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                      Anterior
                    </CPaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <CPaginationItem
                        key={p}
                        active={currentPage === p}
                        onClick={() => setCurrentPage(p)}
                        className={currentPage === p ? 'lucha-page-active' : ''}
                      >
                        {p}
                      </CPaginationItem>
                    ))}
                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Siguiente
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}
            </>
          )}
        </CCardBody>
      </CCard>

      {/* ================================================================
          MODAL: VER DETALLE
          ================================================================ */}
      <CModal
        visible={!!viewUser}
        onClose={() => setViewUser(null)}
        alignment="center"
        size="lg"
      >
        {viewUser && (
          <>
            <CModalHeader className="lucha-modal-header">
              <CModalTitle className="lucha-modal-title">
                Detalle del usuario
              </CModalTitle>
            </CModalHeader>
            <CModalBody className="lucha-modal-body p-4">
              {/* Avatar + nombre */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="lucha-avatar lucha-avatar--lg">
                  {viewUser.picture ? (
                    <img src={viewUser.picture} alt={viewUser.first_name} />
                  ) : (
                    <span>{getInitials(viewUser.first_name, viewUser.last_name)}</span>
                  )}
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">
                    {viewUser.first_name} {viewUser.last_name}
                  </h5>
                  <span className="text-body-secondary">@{viewUser.username}</span>
                  <div className="mt-1">
                    <CBadge className="lucha-badge-role me-2">{viewUser.role.name}</CBadge>
                    <CBadge className={viewUser.is_active ? 'lucha-badge-active' : 'lucha-badge-inactive'}>
                      {viewUser.is_active ? 'Activo' : 'Inactivo'}
                    </CBadge>
                  </div>
                </div>
              </div>

              <CRow className="g-3">
                <CCol xs={12} sm={6}>
                  <div className="lucha-detail-field">
                    <CIcon icon={cilEnvelopeClosed} className="lucha-detail-icon" />
                    <div>
                      <div className="lucha-detail-label">Correo electrónico</div>
                      <div className="lucha-detail-value">{viewUser.email}</div>
                    </div>
                  </div>
                </CCol>
                <CCol xs={12} sm={6}>
                  <div className="lucha-detail-field">
                    <CIcon icon={cilPhone} className="lucha-detail-icon" />
                    <div>
                      <div className="lucha-detail-label">Teléfono</div>
                      <div className="lucha-detail-value">{viewUser.phone ?? 'No registrado'}</div>
                    </div>
                  </div>
                </CCol>
                <CCol xs={12} sm={6}>
                  <div className="lucha-detail-field">
                    <CIcon icon={cilUser} className="lucha-detail-icon" />
                    <div>
                      <div className="lucha-detail-label">Rol</div>
                      <div className="lucha-detail-value">{viewUser.role.name}</div>
                    </div>
                  </div>
                </CCol>
                <CCol xs={12} sm={6}>
                  <div className="lucha-detail-field">
                    <CIcon icon={cilCheck} className="lucha-detail-icon" />
                    <div>
                      <div className="lucha-detail-label">Fecha de registro</div>
                      <div className="lucha-detail-value">{formatDate(viewUser.created_at)}</div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter className="lucha-modal-footer">
              <CButton
                className="lucha-btn-outline"
                onClick={() => setViewUser(null)}
              >
                Cerrar
              </CButton>
              <CButton
                className="lucha-btn-submit"
                onClick={() => {
                  const target = viewUser
                  setViewUser(null)
                  if (target) openEdit(target)
                }}
              >
                <CIcon icon={cilPen} className="me-2" />
                Editar usuario
              </CButton>
            </CModalFooter>
          </>
        )}
      </CModal>

      {/* ================================================================
          MODAL: EDITAR USUARIO
          ================================================================ */}
      <CModal
        visible={!!editTarget}
        onClose={() => setEditTarget(null)}
        alignment="center"
        size="lg"
      >
        {editTarget && (
          <>
            <CModalHeader className="lucha-modal-header">
              <CModalTitle className="lucha-modal-title">
                Editar usuario — @{editTarget.username}
              </CModalTitle>
            </CModalHeader>
            <CModalBody className="lucha-modal-body p-4">
              {editError && <CAlert color="danger">{editError}</CAlert>}
              <CRow className="g-3">
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Nombre</CFormLabel>
                  <CFormInput
                    className="lucha-form-input"
                    value={editForm.first_name ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, first_name: e.target.value }))}
                    placeholder="Nombre"
                  />
                </CCol>
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Apellido</CFormLabel>
                  <CFormInput
                    className="lucha-form-input"
                    value={editForm.last_name ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, last_name: e.target.value }))}
                    placeholder="Apellido"
                  />
                </CCol>
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Correo electrónico</CFormLabel>
                  <CFormInput
                    className="lucha-form-input"
                    type="email"
                    value={editForm.email ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="correo@lalucha.com"
                  />
                </CCol>
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Teléfono</CFormLabel>
                  <CFormInput
                    className="lucha-form-input"
                    value={editForm.phone ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+51 000 000 000"
                  />
                </CCol>
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Rol</CFormLabel>
                  <CFormSelect
                    className="lucha-form-input"
                    value={editForm.role_id ?? editTarget.role.id}
                    onChange={(e) => setEditForm((f) => ({ ...f, role_id: e.target.value }))}
                  >
                    <option value="1">Administrador</option>
                    <option value="2">Agente</option>
                    <option value="3">Supervisor</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Estado</CFormLabel>
                  <CFormSelect
                    className="lucha-form-input"
                    value={(editForm.is_active ?? true) ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, is_active: e.target.value === 'true' }))
                    }
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter className="lucha-modal-footer">
              <CButton
                className="lucha-btn-outline"
                onClick={() => setEditTarget(null)}
                disabled={editLoading}
              >
                <CIcon icon={cilX} className="me-1" />
                Cancelar
              </CButton>
              <CButton
                className="lucha-btn-submit"
                onClick={handleEditSave}
                disabled={editLoading}
              >
                {editLoading ? (
                  <><CSpinner size="sm" className="me-2" />Guardando...</>
                ) : (
                  <><CIcon icon={cilCheck} className="me-2" />Guardar cambios</>
                )}
              </CButton>
            </CModalFooter>
          </>
        )}
      </CModal>

      {/* ================================================================
          MODAL: CONFIRMAR ELIMINACIÓN
          ================================================================ */}
      <CModal
        visible={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        alignment="center"
        size="sm"
      >
        {deleteTarget && (
          <>
            <CModalHeader className="lucha-modal-header">
              <CModalTitle className="lucha-modal-title">Eliminar usuario</CModalTitle>
            </CModalHeader>
            <CModalBody className="lucha-modal-body p-4 text-center">
              <div className="lucha-delete-icon-wrap mb-3">
                <CIcon icon={cilTrash} size="3xl" />
              </div>
              <p className="mb-1">
                ¿Estás seguro de que deseas eliminar a:
              </p>
              <p className="fw-bold mb-0">
                {deleteTarget.first_name} {deleteTarget.last_name} (@{deleteTarget.username})
              </p>
              <p className="text-body-secondary mt-2" style={{ fontSize: '0.85rem' }}>
                Esta acción no se puede deshacer.
              </p>
            </CModalBody>
            <CModalFooter className="lucha-modal-footer justify-content-center">
              <CButton
                className="lucha-btn-outline"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
              >
                Cancelar
              </CButton>
              <CButton
                className="lucha-btn-danger"
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <><CSpinner size="sm" className="me-2" />Eliminando...</>
                ) : (
                  <><CIcon icon={cilTrash} className="me-2" />Eliminar</>
                )}
              </CButton>
            </CModalFooter>
          </>
        )}
      </CModal>
    </>
  )
}

export default UserListPage
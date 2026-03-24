import React from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import routes from '../../routes/routes'
import type { AppRoute } from '../../routes/routes'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

interface BreadcrumbItem {
  pathname: string
  name: string
  active: boolean
}

const AppBreadcrumb: React.FC = () => {
  const location = useLocation()
  const currentLocation = location.pathname

  const getRouteMatch = (pathname: string, routes: AppRoute[]) => {
    for (const route of routes) {
      const match = matchPath({ path: route.path, end: true }, pathname)
      if (match && route.name) {
        return { route, match }
      }
    }
    return null
  }

  const getBreadcrumbs = (location: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []

    const pathParts = location.split('/').filter(Boolean)
    let pathAccumulator = ''

    pathParts.forEach((part, index) => {
      pathAccumulator += `/${part}`
      const routeMatch = getRouteMatch(pathAccumulator, routes)

      if (routeMatch) {
        const { route, match } = routeMatch

        let name = route.name?.toString() || ''

        if (match.params && Object.keys(match.params).length > 0) {
          Object.entries(match.params).forEach(([key, value]) => {
            name = name.replace(`:${key}`, String(value))
            if (name === route.name) {
              name = `${name.replace(/detalle_/, '').replace(/_/g, ' ')} ${value}`
            }
          })
        }

        breadcrumbs.push({
          pathname: pathAccumulator,
          name,
          active: index === pathParts.length - 1,
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0 p-2" style={{ '--cui-breadcrumb-divider': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` } as React.CSSProperties}>
      <CBreadcrumbItem href="#/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem
          {...(breadcrumb.active
            ? { active: true }
            : { href: `#${breadcrumb.pathname}` })}
          key={index}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>

      ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
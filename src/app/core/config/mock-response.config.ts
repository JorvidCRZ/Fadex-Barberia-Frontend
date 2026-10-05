import { ApiResponse, Page, PageResponse } from '../models/common/index.model';

export function mockResponse<T>(data: T): ApiResponse<T> {
  return { data, message: 'Datos simulados cargados correctamente', success: true, timestamp: new Date().toISOString() };
}

export function mockPage<T>(items: T[], page = 0, size = 10): Page<T> {
  const start = page * size;
  const content = items.slice(start, start + size);
  return {
    content,
    pageNumber: page,
    pageSize: size,
    totalElements: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    first: page === 0,
    last: start + size >= items.length,
  };
}

export function mockPageResponse<T>(items: T[], page = 0, size = 10): PageResponse<T> {
  const start = page * size;
  return {
    content: items.slice(start, start + size),
    totalElements: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / size)),
    number: page,
    size,
  };
}

export function buildFormData(partName: string, data: unknown, files?: File[], fileField = 'archivos'): FormData {
    const formData = new FormData();
    formData.append(partName, new Blob([JSON.stringify(data)], { type: 'application/json' }));
    files?.forEach(file => formData.append(fileField, file));
    return formData;
}
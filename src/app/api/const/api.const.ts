import {environment} from 'src/environments/environment';

const apiUrl = environment.apiUrl;

export const MARKERS = `${apiUrl}/marker`;
export const MARKER = (id: string) => `${apiUrl}/marker/${id}/`;

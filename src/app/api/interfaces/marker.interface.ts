export type TMarkerDTO = {
  _id: string;
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    name_address: string;
  };
  barrier_free_elements: string[];
};
export type TMarker = TMarkerDTO;

export const markerTransformer = (DTO: TMarkerDTO): TMarker => {
  return {
    _id: DTO._id,
    name: DTO.name,
    rate: DTO.rate,
    location: DTO.location,
    barrier_free_elements: DTO.barrier_free_elements,
  };
};

export type TCreateMarkerBodyDTO = {
  _id?: string;
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    name_address: string;
  };
  barrier_free_elements: string[];
};

export type TCreateMarkerBody = {
  _id?: string;
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    name_address: string;
  };
  barrier_free_elements: string[];
};

export const createMarkerBody = (
  body: TCreateMarkerBody,
): TCreateMarkerBodyDTO => {
  return {
    _id: body._id,
    name: body.name,
    rate: body.rate,
    location: body.location,
    barrier_free_elements: body.barrier_free_elements,
  };
};

export type TPatchMarkerDTO = {
  _id: string;
  name: string;
  rate: number;
  barrier_free_elements: string[];
};
export type TPatchMarker = TPatchMarkerDTO;

export type TPatchMarkerBodyDTO = {
  _id: string;
  name: string;
  rate: number;
  barrier_free_elements: string[];
};

export type TPatchMarkerBody = {
  _id: string;
  name: string;
  rate: number;
  barrier_free_elements: string[];
};

export const patchMarkerBody = (
  body: TPatchMarkerBody,
): TPatchMarkerBodyDTO => {
  return {
    _id: body._id,
    name: body.name,
    rate: body.rate,
    barrier_free_elements: body.barrier_free_elements,
  };
};

export const createMarkerForm = (body: TMarkerForm): TCreateMarkerBody => {
  const selectedBarriers = body.barrierFree
    .filter(item => item.checked)
    .map(item => item.label);

  return {
    name: body.markerName,
    rate: body.rating,
    barrier_free_elements: selectedBarriers,
    location: {
      lat: body.lat,
      long: body.long,
      name_address: body.nameAddress
    }
  };
}


export type TMarkerForm = {
  markerName: string;
  rating: number;
  barrierFree: { label: string; value: string; checked: boolean }[];
  lat: number;
  long: number;
  nameAddress: string;
};

export type TAuth = {
  userName: string;
  password: string;
};

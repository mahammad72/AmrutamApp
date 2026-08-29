import {
  generateDoctorsPage,
  generateProductsPage,
  generateHealthRecordsPage,
  generateDoctorSlots,
} from './mockData';

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}



const createPagination = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResponse<T> => {
  return {
    data,
    page,
    limit,
    total,
    hasNextPage:
      page * limit < total,
  };
};

export const mockApi = {
  async getDoctors(
    page = 1,
    limit = 20,
  ): Promise<
    PaginatedResponse<
      ReturnType<typeof generateDoctorsPage>[number]
    >
  > {
    const data =
      generateDoctorsPage(
        page,
        limit,
      );

    return createPagination(
      data,
      page,
      limit,
      5000,
    );
  },

  async getProducts(
    page = 1,
    limit = 20,
  ): Promise<
    PaginatedResponse<
      ReturnType<typeof generateProductsPage>[number]
    >
  > {
    const data =
      generateProductsPage(
        page,
        limit,
      );

    return createPagination(
      data,
      page,
      limit,
      20000,
    );
  },

  async getHealthRecords(
    page = 1,
    limit = 20,
  ): Promise<
    PaginatedResponse<
      ReturnType<
        typeof generateHealthRecordsPage
      >[number]
    >
  > {
    const data =
      generateHealthRecordsPage(
        page,
        limit,
      );

    return createPagination(
      data,
      page,
      limit,
      10000,
    );
  },

  async getDoctorSlots(
  doctorId: string,
) {
  return generateDoctorSlots(
    doctorId,
  );
},
};
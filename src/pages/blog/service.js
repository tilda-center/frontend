export default {
  fetchAll: async (page = 0, perpage = 100) => {
    const headers = {
      'Page': page,
      'PerPage': 100,
    }
    const response = await window.rest.get(`/blogs`,{
      headers: headers,
      },
    )
    return response.data
  },

  fetchBySlug: async (year, month, day, slug) => {
    const response = await window.rest.get(
      `/blogs/${year}/${month}/${day}/${slug}`,
    )
    return response.data
  },

  patch: async (year, month, day, slug, data) => {

    const response = await window.rest.patch(
      `/blogs/${year}/${month}/${day}/${slug}`,
      data,
    )
    return response.data
  },

  post: async (data, page = 0, perpage = 100) => {
    const headers = {
      'Page': page,
      'PerPage': 100,
    }
    const response = await window.rest.post(
      `/blogs`,
      data, {
        headers: headers,
      },
    )
    return response.data
  },

  delete: async (year, month, day, slug) => {
    const response = await window.rest.delete(
      `/blogs/${year}/${month}/${day}/${slug}`)
    return response.data
  },

  upload: async (formdata) => {
    const response = await window.rest.post(
      `/blogs/images`,
      formdata,
    )
    return response.data
  }

}

import initial from './initial'


export default class BlogStore {
  constructor(detail, list) {
    this.detail = detail[0]
    this.setDetail = detail[1]
    this.list = list[0]
    this.setList = list[1]
  }

  fetch = async (data, page = 0, perpage = 10) => {
    try {
      const response = await window.rest.get(
        '/blogs',
        {
          headers: {
            Page: page,
            PerPage: perpage,
          },
        },
      )
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }

  get = async (year, month, day, slug) => {
    try {
      const response = await window.rest.get(
        `/blogs/${year}/${month}/${day}/${slug}`,
      )
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }

  patch = async (year, month, day, slug, data) => {
    try {
      const response = await window.rest.patch(
        `/blogs/${year}/${month}/${day}/${slug}`,
        data,
      )
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }

  post = async (data) => {
    try {
      const response = await window.rest.post('/blogs', data)
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }

  upload = async (formdata) => {
    try {
      const response = await window.rest.post('/blogs/images', formdata)
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }

  delete = async (year, month, day, slug) => {
    try {
      const response = await window.rest.delete(
        `/blogs/${year}/${month}/${day}/${slug}`,
      )
      const result = {
        ...response.data,
        ok: true,
      }
      return result

    } catch (error) {
      const result = {
        ...initial,
        ...error,
        ok: false,
      }
      return result
    }
  }
}

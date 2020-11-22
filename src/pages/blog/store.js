import service from './service'
import initial from './initial'


export default class BlogStore {
  constructor(detail, list) {
    this.detail = detail[0]
    this.setDetail = detail[1]
    this.list = list[0]
    this.setList = list[1]
  }

  fetch = async (data) => {
    try {
      const response = await service.fetchAll()
      const result = {
        ...response,
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
      const response = await service.fetchBySlug(year, month, day, slug)
      const result = {
        ...response,
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
      const response = await service.patch(year, month, day, slug, data)
      const result = {
        ...response,
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
      const response = await service.post(data)
      const result = {
        ...response,
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
      const response = await service.upload(formdata)
      const result = {
        ...response,
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
      const response = await service.delete(year, month, day, slug)
      const result = {
        ...response,
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

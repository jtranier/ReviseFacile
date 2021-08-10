import http from '../http-commons';

class DiffusionService {
  findAllByTheme(themeId) {
    return http.get(`/diffusions/by-theme?thematique=${themeId}`)
  }
}

export default new DiffusionService();
import admin from './es/admin.json'
import common from './es/common.json'
import components from './es/components.json'
import data from './es/data.json'
import scoreCard from './es/scoreCard.json'
import views from './es/views.json'
import mexican from './es/mexican.json'

export default {
  admin: { ...admin, ...mexican.admin },
  common: { ...common, ...mexican.common },
  components: { ...components, ...mexican.components },
  data: { ...data, ...mexican.data },
  score_card: scoreCard,
  views: { ...views, ...mexican.views },
}

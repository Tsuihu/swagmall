import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

// 监听图片的加载，刷新可滚动高度
export const itemListenerMixin = {
  data() {
    return{
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成事件监听，刷新scroll的可滚动高度，优化用户体验(防抖)
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    
    // 监听事件总线发送来的事件并保存
    this.itemImgListener = () => {
    // 调用scroll的refresh刷新可滚动高度
    refresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
}

// 返回顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.backTop(0, 0)
    },
  }
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: "pop"
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = "pop"
					break
				case 1:
					this.currentType = "new"
					break
				case 2:
					this.currentType = 'sell'
					break
			}
		}
	}
}



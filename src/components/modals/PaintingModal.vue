<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增畫作</span>
            <span v-else>編輯畫作</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempPainting.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="uploadImage" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  class="form-control"
                  ref="uploadImage"
                  @change="uploadImage"
                />
              </div>
              <img class="img-fluid" :src="tempPainting.imageUrl" />
              <!-- 多圖 -->
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div class="mb-3" v-for="(image, index) in tempPainting.imagesUrl" :key="index">
                  <label for="multiImageUpload" class="form-label"
                    >多圖上傳
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    type="url"
                    id="multiImageUpload"
                    class="form-control"
                    v-model="tempPainting.imagesUrl[index]"
                    placeholder="請輸入連結"
                  />
                  <div>
                    <img class="img-fluid" :src="image" />
                  </div>
                  <button type="button" class="btn btn-outline-danger">移除</button>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100">新增圖片</button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempPainting.title"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="tempPainting.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempPainting.unit"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="year" class="form-label">畫作年份</label>
                  <input
                    type="text"
                    class="form-control"
                    id="year"
                    placeholder="請輸入畫作年份"
                    v-model="tempPainting.year"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="size" class="form-label">尺寸</label>
                  <input
                    type="text"
                    class="form-control"
                    id="size"
                    placeholder="請輸入尺寸"
                    v-model="tempPainting.size"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    min="0"
                    placeholder="請輸入原價"
                    v-model="tempPainting.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    min="0"
                    placeholder="請輸入售價"
                    v-model="tempPainting.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">創作理念</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="tempPainting.description"
                ></textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempPainting.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-painting', tempPainting)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempPainting: {},
    };
  },
  props: {
    painting: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [modalMixin],
  watch: {
    painting() {
      this.tempPainting = this.painting;
      if (!this.tempPainting.imagesUrl) {
        this.tempPainting.imagesUrl = [];
      }
      if (!this.tempPainting.imageUrl) {
        this.tempPainting.imageUrl = '';
      }
    },
  },
  methods: {
    uploadImage() {
      const uploadedImage = this.$refs.uploadImage.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedImage);
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res.data.success) {
            this.tempPainting.imageUrl = res.data.imageUrl;
            this.$refs.uploadImage.value = '';
          } else {
            this.$refs.uploadImage.value = '';
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {},
};
</script>

<template>
  <b-modal
    id="modal-primary"
    ref="modal-primary"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form
      @submit.prevent="statusModal === 'add' ? addProduct() : updateProduct()"
    >
    <div>
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Temel Bilgiler" active><b-card-text>
      <input type="hidden" v-model="product.id" />
      <g-form-group
        label="Name"
        refInp="name"
        :isRow="true"
        v-model="product.name"
      />
      <g-form-group
        label="Barcode"
        refInp="barcode"
        :isRow="true"
        v-model="product.barcode"
      />
      <input type="hidden" v-model="product.image" />
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <b-form-file
            class="form-shadow border-0"
            accept="image/jpeg, image/png, image/jpg"
            v-model="fileImage"
            :state="Boolean(fileImage)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </div>
      </div>
      <div v-if="statusModal !== 'add'" class="form-group row">
        <label class="col-sm-2 col-form-label">Old Image</label>
        <div class="col-sm-10">
          <img
            :src="product.image"
            width="200"
            class="img-fluid img-thumbnail"
            alt="image"
          />
        </div>
      </div>
      <g-form-group
        label="Satış Fiyatı"
        type="text"
        refInp="price"
        :isRow="true"
        v-model="product.price"
      />
      <g-form-group
        label="Alış Fiyatı"
        type="text"
        refInp="buyPrice"
        :isRow="true"
        v-model="product.buyPrice"
      />
      <g-form-group-select
        label="Category"
        refInp="category"
        :isRow="true"
        v-model="product.category"
      >
        <option value disabled selected>Category</option>
        <option
          v-for="category in allCategories"
          :selected="product.category === category.id"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </g-form-group-select>
        </b-card-text></b-tab>
        <b-tab title="Detaylar"><b-card-text>
      <g-form-group
        label="Açıklama"
        refInp="description"
        type="textarea"
        :isRow="true"
        v-model="product.description"
      />
        </b-card-text></b-tab>
        <b-tab title="Stok"><b-card-text>
      <g-form-group
        label="Stok Adedi"
        refInp="description"
        type="textarea"
        :isRow="true"
        v-model="product.stock_count"
      />
      <g-form-group
        label="Alarm Adedi"
        refInp="description"
        type="textarea"
        :isRow="true"
        v-model="product.alarm_count"
      />
        </b-card-text></b-tab>
      </b-tabs>
    </b-card>
      <div class="modal-footer border-top-0">
        <g-button @cus-click="hideModal" cusClass="btn-one px-4 rounded-xs"
          >Cancel</g-button
        >
        <g-button
          type="submit"
          :isLoading="getLoading"
          cusClass="btn-two px-4 rounded-xs"
          >{{ statusModal === 'add' ? 'Add' : 'Update' }}</g-button
        >
      </div>
  </div>
    </form>
    {{ statusHideModal ? hideModal() : '' }}
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'ModalProduct',
  mixins: [mixins],
  props: ['limit'],
  data() {
    return {
      fileImage: null
    }
  },
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('product', ['postProduct', 'getProducts', 'patchProduct']),
    ...mapActions('category', ['getCategories']),
    handleFileUpload() {
      this.fileImage = this.$refs.image.files[0]
    },
    addProduct() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      if (this.fileImage) {
        if (this.fileImage.size > 2097152) {
          return this.toastError('Max file size 2MB')
        }
      }
      formData.append('image', this.fileImage)
      formData.append('name', this.product.name)
      formData.append('barcode', this.product.barcode)
      formData.append('price', this.product.price)
      formData.append('buyPrice', this.product.buyPrice)
      formData.append('idCategory', this.product.category)
      console.log(formData)
      this.postProduct(formData)
        .then((response) => {
          console.log(formData)
          this.toastSuccess('Data successfully added')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    updateProduct() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      if (this.fileImage) {
        if (this.fileImage.size > 2097152) {
          return this.toastError('Max file size 2MB')
        }
      }
      formData.append('image', this.fileImage)
      formData.append('oldImage', this.product.image)
      formData.append('name', this.product.name)
      formData.append('barcode', this.product.barcode)
      formData.append('price', this.product.price)
      formData.append('buyPrice', this.product.buyPrice)
      formData.append('idCategory', this.product.category)
      this.patchProduct({ data: formData, id: this.product.id })
        .then((response) => {
          this.toastSuccess('Data successfully updated')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    hideModal() {
      this.$refs['modal-primary'].hide()
      this.changeStatusHideModal(false)
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapGetters(['getLoading']),
    ...mapState('product', ['product', 'update', 'title', 'currentPage']),
    ...mapGetters('category', ['allCategories'])
  }
}
</script>

<style scoped>
.form-shadow {
  border: 0;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>

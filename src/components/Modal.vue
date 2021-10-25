<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot
            name="header"
            v-if="hasHeader"
          >
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            &#10006;
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
          v-if="hasBody"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer
          class="modal-footer"
          v-if="hasFooter"
        >
          <slot name="footer">
            This is the default footer!
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script>
// https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component
export default {
  name: "Modal",
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    },
    hasBody() {
      return !!this.$slots.body;
    },
    hasFooter() {
      return !!this.$slots.footer;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>


<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 10px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
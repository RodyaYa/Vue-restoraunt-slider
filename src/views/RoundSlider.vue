<template>
  <div class="r-slider">
    <div class="r-slider__preview">
      <div
        class="preview__items"
        :style="{ transform: `rotate(${previewRotate}deg)` }"
        ref="preview"
      >
        <div
          v-for="(slide, index) in sliderItems"
          :key="slide.id"
          class="preview__item"
        >
          <div
            class="preview__item-inner"
            :style="{ transform: `rotate(${rotate}deg)` }"
          >
            <img class="preview-image" :src="slide.image" alt="Image" />
            <div
              :class="`preview__content ${
                currentItemIndex === index ? 'active' : ''
              }`"
            >
              <div class="content__title">
                {{ slide.title }}
                <div class="content__price">
                  {{ slide.price }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 1); transform: none; msfilter: "
                  >
                    <path
                      d="M11.707 2.293A.997.997 0 0 0 11 2H6a.997.997 0 0 0-.707.293l-3 3A.996.996 0 0 0 2 6v5c0 .266.105.52.293.707l10 10a.997.997 0 0 0 1.414 0l8-8a.999.999 0 0 0 0-1.414l-10-10zM13 19.586l-9-9V6.414L6.414 4h4.172l9 9L13 19.586z"
                    ></path>
                    <circle cx="8.353" cy="8.353" r="1.647"></circle>
                  </svg>
                </div>
              </div>
              <div class="content__desc">{{ slide.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="r-slider__control">
      <div
        v-for="(slide, index) in sliderItems"
        :key="slide.id"
        :class="`control__item ${isButtonBlocked ? 'blocked' : ''} ${
          currentItemIndex === index ? 'active' : ''
        }`"
        @click="setPosition(index)"
      >
        {{ slide.title }}
        <div class="control__tooltip">
          <span>В корзину</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(255, 255, 255, 1); transform: none; msfilter: "
          >
            <path
              d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z"
            ></path>
            <path d="M9 13h2v5H9zm4 0h2v5h-2z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isButtonBlocked: false,
    prevItemIndex: 0,
    currentItemIndex: 0,
    previewRotate: 0,
    rotate: 0,
    sliderItems: [
      {
        id: 1,
        title: "Триббиано Ди Соаве",
        price: "₴230",
        desc: "Горячий морской коктейль в сливочном соусе Блю чиз на миксе салата",
        image: require("../assets/dish1.png"),
      },
      {
        id: 2,
        title: "Цезарь с курицей",
        price: "₴160",
        desc: "Знаменитый салат с добавлением куриного филе на гриле, листьев айсберга и ромена, пармезана, заправлен соусом цезарь",
        image: require("../assets/dish2.png"),
      },
      {
        id: 3,
        title: "Чука Европейская",
        price: "₴20",
        desc: "Коктейль морепродуктов с водорослями чука на миксе салата, заправлен ореховым соусом",
        image: require("../assets/dish3.png"),
      },
      {
        id: 4,
        title: "Итальянскиий Рай",
        price: "₴16",
        desc: "Бостурма , филе телятины запечённое , помидор , маринованный крымский лук , орегано , сыр , соус ( майонез )",
        image: require("../assets/dish4.png"),
      },
    ],
  }),
  methods: {
    fromLastToFirst() {
      this.$refs.preview.style.transition = "none";
      const items = document.querySelectorAll(".preview__item-inner");
      items.forEach((item) => {
        item.style.transition = "none";
      });
      this.rotate = 0;
      this.previewRotate = `-0`;
      setTimeout(() => {
        items.forEach((item) => {
          item.style.transition = "1000ms ease-in-out";
        });
        this.$refs.preview.style.transition = "1000ms ease-in-out";
        this.$refs.preview.removeEventListener(
          "transitionend",
          this.fromLastToFirst
        );
        this.isButtonBlocked = false;
      }, 50);
    },
    fromFirstToLast() {
      this.$refs.preview.style.transition = "none";
      const items = document.querySelectorAll(".preview__item-inner");
      items.forEach((item) => {
        item.style.transition = "none";
      });
      this.rotate = `270`;
      this.previewRotate = `-270`;
      setTimeout(() => {
        items.forEach((item) => {
          item.style.transition = "1000ms ease-in-out";
        });
        this.$refs.preview.style.transition = "1000ms ease-in-out";
        this.$refs.preview.removeEventListener(
          "transitionend",
          this.fromFirstToLast
        );
        this.isButtonBlocked = false;
      }, 50);
    },
    setPosition(pos) {
      this.currentItemIndex = pos;

      if (this.prevItemIndex === pos) {
        this.isButtonBlocked = false;
        return;
      }

      this.isButtonBlocked = true;
      this.rotate = 90 * pos;
      this.previewRotate = `-${90 * pos}`;

      // if user click on FIRST item after after LAST item
      if (this.prevItemIndex === this.sliderItems.length - 1 && pos === 0) {
        this.rotate = 360;
        this.previewRotate = `-360`;
        this.$refs.preview.addEventListener(
          "transitionend",
          this.fromLastToFirst
        );
        // if user click on LAST item after after FIRST item
      } else if (
        this.prevItemIndex === 0 &&
        pos === this.sliderItems.length - 1
      ) {
        this.rotate = `-90`;
        this.previewRotate = `90`;
        this.$refs.preview.addEventListener(
          "transitionend",
          this.fromFirstToLast
        );
      }

      setTimeout(() => {
        this.isButtonBlocked = false;
      }, 1200);

      this.prevItemIndex = pos;
    },
  },
};
</script>

<style lang="scss">
.r-slider {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__preview {
    position: relative;
    width: 1000px;
    height: 500px;
    overflow: hidden;
    .preview {
      &__content {
        transition: 1500ms ease-in-out;
        margin-top: -50px;
        opacity: 100;
        &.active {
          margin-top: 0;
          opacity: 1;
        }
        .content {
          &__title {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 1.5rem;
          }
          &__desc {
            margin-top: 1rem;
            text-align: justify;
          }
          &__price {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            svg {
              margin-left: 5px;
            }
          }
        }
      }
      &__items {
        position: absolute;
        left: 50%;
        top: -50%;
        transition: 1000ms ease-in-out;
      }
      &-name {
      }
      &-image {
        display: inline-block;
        width: 500px;
        height: 300px;
        object-fit: contain;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &__item {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        &-inner {
          transition: 1000ms ease-in-out;
        }
        &:nth-child(1) {
          padding-top: 1000px;
        }
        &:nth-child(2) {
          padding-right: 1000px;
        }
        &:nth-child(3) {
          padding-bottom: 1000px;
        }
        &:nth-child(4) {
          padding-left: 1000px;
        }
      }
    }
  }
  &__control {
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    .control {
      &__tooltip {
        transition: 300ms ease-in-out;
        position: absolute;
        display: flex;
        padding: 10px 30px;
        justify-content: space-between;
        align-items: center;
        left: 0;
        bottom: 0;
        opacity: 0;
        width: 100%;
        height: 60px;
        color: #ffffff;
        background-color: #78cb66;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        z-index: -1;
        &:hover {
          background-color: #38a151;
        }
      }
      &__item {
        position: relative;
        cursor: pointer;
        transition: 250ms ease-in-out;
        padding: 10px 30px;
        border-radius: 8px;
        border: 3px solid #67697c;
        background-color: #ffffff;
        color: #67697c;
        font-weight: bold;
        min-width: 180px;
        &.blocked {
          cursor: not-allowed;
          pointer-events: none;
        }
        &.active {
          border: 3px solid #545874;
          color: #eaeaf5;
          background-color: #545874;
          & .control__tooltip {
            bottom: -60px;
            opacity: 1;
          }
        }
        &:hover {
          border: 3px solid #545874;
          color: #eaeaf5;
          background-color: #545874;
          & .control__tooltip {
            bottom: -60px;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>

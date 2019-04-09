<template>
  <div id="app">
    <div v-if="unsubmit">
      <img class="close" @click="close" src="../static/img/close.png">
      <div class="main">
        <h6>新建活动</h6>
        <h3>预约</h3>
        <transition name="toChange1">
          <div v-if="show1" id="toChange1">
            <form class="inputbox">
              <h5>姓名</h5>
              <input v-model="name" id="name" class="name" type="text" name="name">
              <h5>方向</h5>
              <img class="more" @click="isShow" src="../static/img/more.png">
              <input
                v-model="direction"
                id="direction"
                @click="show4=false"
                maxlength="9"
                class="direction"
                type="text"
                name="direction"
              >
              <ul class="dire" v-if="show4">
                <div class="dires">
                  <li @click="getValue" value="策划方向">策划方向</li>
                  <li @click="getValue" value="产品方向">产品方向</li>
                  <li @click="getValue" value="公关方向">公关方向</li>
                  <li @click="getValue" value="新媒体方向">新媒体方向</li>
                  <li @click="getValue" value="视觉方向">视觉方向</li>
                  <li @click="getValue" value="视频方向">视频方向</li>
                  <li @click="getValue" value="摄影方向">摄影方向</li>
                  <li @click="getValue" value="Android方向">Android方向</li>
                  <li @click="getValue" value="Web方向">Web方向</li>
                  <li @click="getValue" value="IOS方向">IOS方向</li>
                </div>
              </ul>
              <h5>电话</h5>
              <input
                v-model="telephone"
                id="telephone"
                class="telephone"
                type="text"
                name="telephone"
              >
            </form>
          </div>
        </transition>
        <transition name="toChange2">
          <div v-if="show2" id="toChange2">
            <form class="inputbox">
              <h5>标题</h5>
              <input v-model="title" id="title" class="title" type="text" name="title">
              <h5>标识</h5>
              <input v-model="mark" id="mark" class="mark" type="text" name="mark">
              <h5>地点</h5>
              <input v-model="location" id="location" class="location" type="text" name="location">
            </form>
          </div>
        </transition>
        <transition name="toChange3">
          <div v-if="show3" id="toChange3">
            <form class="inputbox">
              <h5>开始</h5>
              <div class="date-time-input">
                <input
                  v-model="start"
                  @click="sshow"
                  id="start"
                  class="start"
                  type="text"
                  name="start"
                >
              </div>
              <date-time ref="dateTime1" type="time" @confirm="select1"></date-time>
              <h5>结束</h5>
              <div class="date-time-input">
                <input v-model="end" @click="eshow" id="end" class="end" type="text" name="end">
              </div>
              <date-time ref="dateTime2" type="time" @confirm="select2"></date-time>
            </form>
          </div>
        </transition>
      </div>
      <div class="button">
        <img @click="priorclick" v-if="btn" id="prior" class="prior" src="../static/img/prior.png">
        <img @click="priorsclick" v-if="btns" class="priors" src="../static/img/priors.png">
        <img @click="nextclick" id="next" class="next" src="../static/img/next.png">
      </div>
    </div>

    <div class="ok" v-if="submitted">
      <img class="finish" @click="back" src="../static/img/submitted.png">
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import DateTime from "vue-date-time-m";
import axios from "axios";

(function(doc, win) {
  var docEl = doc.documentElement,
    // code,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      /* var clientHeight = docEl.clientHeight;
         if (!clientHeight) return;
         var BaseFontSize = 100* (clientHeight/568);
         docEl.style.fontSize = BaseFontSize + 'px';*/
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      var BaseFontSize = 24 * (clientWidth / 750);
      docEl.style.fontSize = BaseFontSize + "px";
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

export default {
  name: "App",
  components: {
    HelloWorld,
    DateTime
  },
  data() {
    return {
      name: "",
      direction: "",
      telephone: "",
      title: "",
      mark: "",
      location: "",
      start: "",
      end: "",
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      btn: true,
      btns: false,
      unsubmit: true,
      submitted: false,
      divindex: 1,
      btnindex: 1
    };
  },
  methods: {
    close() {},
    nextclick() {
      this.divindex++;
      if (this.divindex == 1) {
        (this.show1 = true),
          (this.show2 = false),
          (this.show3 = false),
          (this.btn = true),
          (this.btns = false);
      } else if (this.divindex == 2) {
        (this.show1 = false),
          (this.show2 = true),
          (this.show3 = false),
          (this.btn = false),
          (this.btns = true);
      } else if (this.divindex == 3) {
        (this.show1 = false),
          (this.show2 = false),
          (this.show3 = true),
          (this.btn = false),
          (this.btns = true);
      } else if (this.divindex > 3) {
        if (this.end != 0 && this.end < this.start) {
          alert("结束时间必须大于开始时间！请重新选择！");
          return false;
        } else if (this.start == 0) {
          alert("请选择开始时间！");
          return false;
        } else if (this.end == 0) {
          alert("请选择结束时间！");
          return false;
        } else {
          var url = "";
          this.$ajax
            .post(url, {
              name: this.name,
              direction: this.direction,
              telephone: this.telephone,
              title: this.title,
              mark: this.mark,
              location: this.location,
              start: this.start,
              end: this.end
            })
            .catch(err => {
              console.log(err);
            });
          (this.unsubmit = false), (this.submitted = true);
        }
      }
    },
    priorclick() {},
    priorsclick() {
      this.divindex--;
      if (this.divindex == 1) {
        (this.show1 = true),
          (this.show2 = false),
          (this.show3 = false),
          (this.btn = true),
          (this.btns = false);
      } else if (this.divindex == 2) {
        (this.show1 = false),
          (this.show2 = true),
          (this.show3 = false),
          (this.btn = false),
          (this.btns = true);
      } else if (this.divindex == 3) {
        (this.show1 = false),
          (this.show2 = false),
          (this.show3 = true),
          (this.btn = false),
          (this.btns = true);
      }
    },
    isShow() {
      this.show4 = !this.show4;
    },
    back() {},
    getValue(event) {
      var e = event.currentTarget;
      var states = e.innerHTML;
      this.direction = states;
      this.show4 = !this.show4;
    },
    sshow() {
      this.$refs.dateTime1.show();
    },
    eshow() {
      this.$refs.dateTime2.show();
    },
    select1(val) {
      this.start = val;
    },
    select2(val) {
      this.end = val;
    }
  }
};
</script>

<style>
@import "../static/css/newActivity.css";
@import "../static/font/font.css";
</style>

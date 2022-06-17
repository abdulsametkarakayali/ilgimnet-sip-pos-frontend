<template>
  <b-card no-body class="product bg-transparent border-0">
    <div class="card-body card-history" :class="background">
      <div class="card-history-detail">
        <div class="title">
          <span class="mr-3">{{title}}</span>
          <span v-if="showUpgrade">
            <b-icon v-if="upgradeCheck" icon="arrow-up-circle" scale="2" variant="success" />
            <b-icon v-if="!upgradeCheck" icon="arrow-down-circle" scale="2" variant="danger" />
          </span>
        </div>
        <span class="price d-block">{{price}}</span>
        <span class="percent d-block">{{percent}}</span>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'HistoryInfoItem',
  props: [
    'title',
    'price',
    'percent',
    'background',
    'upgradeCheck',
    'showUpgrade'
  ]
}
</script>

<style scoped>
.card-history-detail {
  margin: 0 0 20px 20px;
}

.card-history.bg-1 {
      padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    min-height: 120px;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.card-history.bg-2 {
  background: linear-gradient(
    285.38deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card-history.bg-3 {
  background: linear-gradient(
    285.38deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card-history {
  font-weight: bold;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
}

.card-history .title {
  font-size: 13px;
  margin-bottom: 6px;
}

.card-history .price {
  font-size: 30px;
  margin-bottom: 2px;
}

.card-history .percent {
  font-size: 13px;
}
</style>

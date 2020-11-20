<template>
  <div class="transaction">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-else class="content">
      <h1>Transaction</h1>
      <button @click="startListening()">start</button>
      <button @click="stopListening()">stop</button>

      <table class="table">
        <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            From
          </th>
          <th scope="col">
            To
          </th>
          <th scope="col">
            Summ
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(message, index) in messages"
          :key="index"
        >
          <th scope="row">{{ index }}</th>
          <td>{{ message.x.hash }}</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  data() {
    return {
      loading: false,
      connection: null,
      messages: []
    }
  },
  methods: {
    startListening() {
      const message = '{"op":"unconfirmed_sub"}';
      this.connection.send(message);
    },
    stopListening() {
      const message = '{"op":"unconfirmed_unsub"}';
      this.connection.send(message);
    },

    updateMessages(msg) {
      console.log(JSON.parse(msg.data));
      this.messages.push(JSON.parse(msg.data));
    }
  },
  created() {
    const self = this;
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://ws.blockchain.info/inv")

    this.connection.onmessage = function (event) {
      self.updateMessages(event);
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

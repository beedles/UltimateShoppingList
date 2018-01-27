<template>
  <div id="app">
    <div id="mainList" class="grey lighten-3">
      <v-app id="shoppingList">
        <v-toolbar color="blue-grey darken-2">
          <v-toolbar-side-icon/>
          <v-toolbar-title class="white--text">Ultimate Shopping List</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="add_new_item">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid style="min-height: 0;" grid-list-lg>
          <v-layout row wrap>
            <shopping_item :edit.sync="item.edit" :key="index" :name.sync="item.name" :done="item.done" v-for="(item, index) in items"/>
          </v-layout>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'shopping_item': {
      template: `<v-flex xs12>
            <v-card color="blue-grey lighten-4" v-on:click.capture="edit_item" v-if="!edit">
                <v-card-text>
                    <div>{{ name }}</div>
                </v-card-text>
            </v-card>
            <v-card color="blue-grey lighten-4" class="edit_item_name" v-if="edit">
                <v-card-text>
                    <v-text-field focus-on-create v-bind:value="name" ref="new_name" :hide-details="true"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green" @click="save_item">
                        Save
                    </v-btn>
                    <v-btn @click="close_edit_item" flat icon color="red"><v-icon dark>close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>`,
      props: ['name', 'done', 'edit'],
      methods: {
        edit_item: function () {
          // this.edit = true
          // hide all edits then open this one
          this.$root.$emit('close_edit')
          this.$emit('update:edit', true)
        },
        save_item: function () {
          this.$emit('update:name', this.$refs['new_name'].inputValue)
          this.$root.$emit('close_edit')
        },
        close_edit_item: function () {
          this.$root.$emit('close_edit')
        }
      }
    }
  },
  mounted: function () {
    this.$root.$on('close_edit', () => {
      let self = this
      this.items.forEach(function (value, key) {
        value.edit = false
        if (value.name.trim() === '') {
          console.log(key)
          console.log(self.items)
          self.items.splice(key, 1)
          console.log(self.items)
        }
      })
    })
  },
  methods: {
    add_new_item: function () {
      let item = {
        name: '',
        done: false,
        edit: true
      }
      this.$root.$emit('close_edit')
      this.items.push(item)
    }
  },
  data () {
    return {
      items: [
        {name: 'Bread',
          done: false,
          edit: false},
        {name: 'Milk',
          done: true,
          edit: false}
      ]
    }
  }
}
</script>

<style>
  #mainList {
    max-width:400px;
    margin: auto;
  }
  .edit_item_name  .input-group {
    padding-top: 0;
  }
</style>

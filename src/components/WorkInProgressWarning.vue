<template>
  <div
    id="warning"
    class="usa-prose"
  >
    <p
      v-if="buttonText === 'I understand'"
      class="warning-open"
    >
      ATTENTION! - You are viewing a prototype application that is in active development. 
      Contents seen here are preliminary visualizations of model output. <strong>DO NOT CITE</strong> or use information 
      contained in this application until review and final application is released.
    </p>
    <button @click="toggleWarning">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
    export default {
        name: 'WorkInProgressWarning',
        data() {
            return {
                buttonText: 'I understand'
            }
        },
        methods: {
            toggleWarning() {
                this.buttonText === 'I understand' ? this.buttonText = 'read in progress warning' : this.buttonText = 'I understand';
            }
        }
    }
</script>

<style scoped lang="scss">
    #warning{
        width: 100%;
    }
    .usa-prose {
        background-color: #b9c7d2;
        padding-bottom: 0.3em;
        padding-top: 0.3em;
        p {
            max-width: 60em;
            text-align: center;
            margin: 0 auto;
        }
        button {
            display: block;
            margin: 0 auto;
            background: #003366;
            color: #ffffff;
            border: none;
            outline: none;
            padding: 2px 10px;
            border-radius: 5px;
            font-weight: bold;
            font-size: small;
        }
    }
</style>

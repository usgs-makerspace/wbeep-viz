<template>
  <div id="container-questions-answers">
    <div id="dynamicComponentTabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        Water {{ tab }}
      </button>
      <component
        :is="currentTabComponent"
        class="QAtab"
      />
    </div> 
  </div>
</template>

<script>
    import tab_storage from "../views/waterStorage/WaterStorageQA";
    import ContactUs from "../components/ContactUs";
    import References from "../components/References";
    import QuestionsAnswersAccordion from "../components/QuestionsAnswersAccordion";
    import questionsAndAnswers from "../assets/questionsAndAnswers/questionsAndAnswers";

    export default {
        name: "QuestionsAndAnswers",
        components: {
            ContactUs,
            References,
            QuestionsAnswersAccordion,
            tab_storage
        },
        data() {
            return {
                currentTab: this.$store.state.tabToOpen,
                tabs: ["Storage"],
                title: process.env.VUE_APP_TITLE,
                developmentTier: process.env.VUE_APP_TIER,
                feedbackEmailAddress: process.env.VUE_APP_FEEDBACK_EMAIL_ADDRESS,
                pageContents: questionsAndAnswers.pageContents
            };
        },
        computed: {
          currentTabComponent: function(){
            return "tab_" + this.currentTab.toLowerCase();
          }
        }
    }
</script>

<style scoped lang="scss">
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
    font-size: .9em;
  }
  button:not([disabled]):focus{
    outline: none;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .QAtab {
    border: 1px solid #ccc;
    padding: 10px;
  }
  #container-questions-answers {
    background: white;
    margin: 0 auto;
    padding: 10px;
    max-width: 50em;
  }
  hr {
    margin: 1em 0 1em 0;
  }
  .usa-accordion__content{
    p{
      display: inline;
    }
  }
  #referencesContainer {
    margin-top: 3em;
  }
  @media screen and (min-width: 600px){
    .tab-button{
      font-size: 1em;
    }
  }
</style>
<style lang="scss">
.section-title {
    margin: 0.5em 0 0.5em 0;
    font-size: larger;
    button {
      margin: 10px 0 10px 0;
      text-align: center;
      background: #003366;
      color: #ffffff;
      border: none;
      outline: none;
      padding: 2px 10px 5px 10px;
      border-radius: 5px;
      font-size: .9em;
      font-weight: bold;
    }
  }
  @media screen and (min-width: 600px){
    #container-questions-answers{
      .section-title {
        button{
          margin: 0 0 10px 0;
          float: right;
        }
      }
    }
  }
</style>
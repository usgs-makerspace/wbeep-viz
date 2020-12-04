<template>
  <div class="usa-prose">
    <!-- Water Storage -->
    <h2>Water Storage</h2>
    <div
      v-for="section in pageContents.waterStorageAccordionSections"
      :key="section.sectionTitle"
    >
      <h6 class="section-title">
        {{ section.sectionTitle }}
        <router-link
          to="/"
        >
          <button>
            Return to Water Storage
          </button>
        </router-link>
      </h6>
      <div class="usa-accordion usa-accordion--bordered">
        <div
          v-for="question in section.questionsAndAnswers"
          :key="question.question"
        >
          <h2 class="usa-accordion__heading">
            <button
              class="usa-accordion__button"
              aria-expanded="true"
              :aria-controls="question.id"
            >
              {{ question.question }}
            </button>
          </h2>
          <div
            :id="question.id"
            class="usa-accordion__content usa-prose"
          >
            <p><span v-html="question.answer" /></p>
          </div>
        </div>
      </div>
    </div>
    <h2 id="waterUseSection">
      Water Use
    </h2>
    <!-- Water Use -->
    <div
      v-for="section in pageContents.waterUseAccordionSections"
      :key="section.sectionTitle"
    >
      <h6 class="section-title">
        {{ section.sectionTitle }}
        <router-link
          to="/water-use"
        >
          <button>
            Return to Water Use
          </button>
        </router-link>
      </h6>
      <div class="usa-accordion usa-accordion--bordered">
        <div
          v-for="question in section.questionsAndAnswers"
          :key="question.question"
        >
          <h2 class="usa-accordion__heading">
            <button
              class="usa-accordion__button"
              aria-expanded="true"
              :aria-controls="question.id"
            >
              {{ question.question }}
            </button>
          </h2>
          <div
            :id="question.id"
            class="usa-accordion__content usa-prose"
          >
            <p><span v-html="question.answer" /></p>
          </div>
        </div>
      </div>
    </div>
    <h2 id="waterTempSection">
      Water Temperature
    </h2>
    <!-- Water Temp -->
    <div
      v-for="section in pageContents.waterTempAccordionSections"
      :key="section.sectionTitle"
    >
      <h6 class="section-title">
        {{ section.sectionTitle }}
        <router-link
          to="/water-temperature"
        >
          <button>
            Return to Temperature
          </button>
        </router-link>
      </h6>
      <div class="usa-accordion usa-accordion--bordered">
        <div
          v-for="question in section.questionsAndAnswers"
          :key="question.question"
        >
          <h2 class="usa-accordion__heading">
            <button
              class="usa-accordion__button"
              aria-expanded="true"
              :aria-controls="question.id"
            >
              {{ question.question }}
            </button>
          </h2>
          <div
            :id="question.id"
            class="usa-accordion__content usa-prose"
          >
            <p><span v-html="question.answer" /></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import questionsAndAnswers from "../assets/questionsAndAnswers/questionsAndAnswers";

    export default {
        name: "QuestionsAndAnswersAccordion",
        data() {
            return {
                pageContents: questionsAndAnswers.pageContents
            };
        }
    }
</script>

<style scoped lang="scss">
  #container-questions-answers {
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
    .usa-accordion__content{
      p{
        display: inline;
      }
    }
    hr {
      margin: 1em 0 1em 0;
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

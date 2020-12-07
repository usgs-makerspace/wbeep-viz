<template>
  <div class="usa-prose">
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
          <button @click="runGoogleAnalytics('Questions & Answers', 'Click', 'User Returned to Water Use')">
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
    <div
      id="referencesContainer"
      class="usa-prose"
    >
      <h2>{{ titleWaterUse }}</h2>
      <div
        v-for="reference in referencesWaterUse"
        :key="reference.reference"
      >
        <p class="about-ref">
          {{ reference.reference }}
          <a
            :href="reference.href"
            target="_blank"
          >
            <span v-html="reference.href" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import questionsAndAnswers from "@/assets/questionsAndAnswers/questionsAndAnswers";
    import references from "@/assets/references/references";
    export default {
        name: 'WaterUseQA',
        data() {
            return {
                featureName: 'Water Use',
                pageContents: questionsAndAnswers.pageContents,
                titleWaterUse: references.referenceSectionWaterUse.title,
                referencesWaterUse: references.referenceSectionWaterUse.references
            }
        },
        methods:{
          runGoogleAnalytics(eventName, action, label) {
              this.$ga.set({ dimension2: Date.now() });
              this.$ga.event(eventName, action, label)
          }
        }
    }
</script>

<style scoped lang="scss"></style>

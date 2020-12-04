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
    <div
      id="referencesContainer"
      class="usa-prose"
    >
      <h2>{{ titleWaterStorage }}</h2>
      <div
        v-for="reference in referencesWaterStorage"
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
        name: 'WaterStorageQA',
        data() {
          return {
              pageContents: questionsAndAnswers.pageContents,
              titleWaterStorage: references.referenceSectionWaterStorage.title,
              referencesWaterStorage: references.referenceSectionWaterStorage.references,
              from: null
          };
        },
        beforeRouteEnter(to, from, next){
          next((vm) => {
            vm.from = from;
          })
          console.log(from);
        }
    }
</script>

<style scoped lang="scss"></style>

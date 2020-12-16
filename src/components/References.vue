<template>
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
    <h2>{{ titleWaterTemp }}</h2>
    <div
      v-for="reference in referencesWaterTemp"
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
</template>
<script>
  import references from "../assets/references/references";
  import questionsAndAnswers from "../assets/questionsAndAnswers/questionsAndAnswers";

  export default {
      name: "References",
      data() {
          return {
              titleWaterStorage: references.referenceSectionWaterStorage.title,
              referencesWaterStorage: references.referenceSectionWaterStorage.references,
              titleWaterUse: references.referenceSectionWaterUse.title,
              referencesWaterUse: references.referenceSectionWaterUse.references,
              titleWaterTemp: references.referenceSectionWaterTemp.title,
              referencesWaterTemp: references.referenceSectionWaterTemp.references
          };
      },
  }
</script>

<style lang="scss">
  #referencesContainer {
    margin-top: 30px;
    a{
        color: #003366;
        font-weight: bold;
        text-decoration: none;
        &:hover{
          text-decoration: underline;
        }
      };
  }

</style>

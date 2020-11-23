<template>
  <div />
</template>
<script>
    import { icon } from "@fortawesome/fontawesome-svg-core";

    export default {
        name: "QuestionControl",
        inject: ["mapbox", "map", "actions"],
        data() {
            return {
                control: null,
                currentFeature: this.$route.name
            }
        },
        mounted() {
            this.createCustomControl();
            this.prepareClickEvent(this.runGoogleAnalytics, this.$router);
        },
        methods: {
            runGoogleAnalytics(eventName, action, label) {
                this.$ga.set({ dimension2: Date.now() });
                this.$ga.event(eventName, action, label)
            },
            createCustomControl() {
                class customControl {
                    onAdd(map) {
                        const self = this;
                        this.map = map;
                        this.control = document.createElement("div");
                        this.control.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
                        this.button = document.createElement("button");
                        this.button.id = "icon-map-control-question";
                        this.button.className = "mapboxgl-ctrl-icon icon-map-control icon-map-control-question";
                        this.button.setAttribute("aria-label", "questions" );
                        this.icon = document.createElement("span");
                        this.icon.innerHTML = icon({
                            prefix: "fas",
                            iconName: "question"
                        }).html;
                        this.button.appendChild(this.icon);
                        this.control.appendChild(this.button);
                        return this.control;
                    }
                    onRemove() {
                        this.control.parentNode.removeChild(this.control);
                        this.map = undefined;
                    }
                }
                const myCustomControl = new customControl();
                this.map.addControl(myCustomControl, "top-right");
            },
            //Trash function to deal with how we have two different question button situtations
            prepareClickEvent(googleAnalytics, router){
                let self = this;
                let element = document.getElementById("icon-map-control-question")
                element.classList.add(this.currentFeature);
                element.onclick = function(e){
                    googleAnalytics('about', 'click', 'user went to about page');
                    e.preventDefault();
                    e.stopPropagation();
                    if(element.classList.contains("waterTemperature")){
                        self.$store.commit('changeTabToBeOpened', 'Temperature');
                    }else{
                        self.$store.commit('changeTabToBeOpened', 'Storage');
                    }
                    router.push({ path: 'QuestionsAndAnswers' });    
                }
            }
        }
    };
</script>

<template>
  <div id="legendModal">
    <div id="legendModalExit">
      <a id="modalExitIcon">
        <font-awesome-icon
          id="legendExit"
          icon="times"
          aria-label="legend exit"
          @click="$emit('clickedX')"
        />
      </a>
    </div>
    <div id="legendModalContent">
      <p class="bold">
        Q: Can I compare the natural water storage value from one region to another?
      </p>
      <p class="bold">
        A: No. Natural water storage is determined daily relative to past storage for that specific region. While two regions may share the same daily water storage category, they are individually calculated.
      </p>
      <hruSVG id="hruSVG" />
      <p>Below are correct and incorrect interpretations:</p>
      <div
        id="correct"
        class="possibleInterpretation"
      >
        <div
          id="thumbsUp"
          class="icon"
        >
          <font-awesome-icon icon="thumbs-up" />
        </div>
        <div class="interpretation">
          <p>Region 3 has more water than normal, whereas region 2 has less water than normal.  Region 1 has a normal water storage value for today.</p>
        </div>
      </div>
      <div
        id="incorrect"
        class="possibleInterpretation"
      >
        <div
          id="thumbsDown"
          class="icon"
        >
          <font-awesome-icon icon="thumbs-down" />
        </div>
        <div class="interpretation">
          <p>Region 3 has more water than regions 1 and 2.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hruSVG from "../images/states/example.svg"
export default {
    name: "LegendModal",
    components:{
        hruSVG
    }
}
</script>
<style scoped lang="scss">
$border: 1px solid rgb(200, 200, 200);
$background: rgb(255, 255, 255);
$borderRadius: 5px;

#legendModal{
    background: $background;
    border-radius: $borderRadius 0 $borderRadius $borderRadius;
    border: $border;
    max-width: 90%;
    padding: 0 0 10px 0;

    p{
        margin: 0;
        font-size: .8em;
    }
}

#legendModalExit{
    text-align: right;
    a{
        display: inline-block;
        height: 100%;
        text-align: center;
        padding: 2px 8px;
        cursor: pointer;

        svg{
            margin: 4px 0 0 0;
        }
    }
}

#legendModalContent{
    padding: 5px 10px 0 10px;
    p{
        margin-bottom: 8px;
    }
    .bold{
            font-weight: bold;
    }
    #hruSVG{
        width: auto;
        height: 120px;
        margin-bottom: 8px;
    }
}

.possibleInterpretation{
    display: flex;

    .icon{
        width: 25px;
        height: 25px;
        margin-right: 5px;

        svg{
            height: 100%;
            width: 100%;
        }
    }

    .interpretation{
        flex: 1;
    }
}

#thumbsUp{
   color: #b9d7a7;
}

#thumbsDown{
   color: #e54b4b;
}

@media screen and (min-width: 600px){
    #legendModal{
        max-width: 300px;
    }

    #legendModalContent{
        #hruSVG{
            width: 100%;
            height: auto;
        }
    }
}
</style>
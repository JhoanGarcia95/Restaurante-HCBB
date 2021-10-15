<template>
<div class="menu">
    <MenuSemanal/>
    <Carta/>
</div>
</template>

<script>
// @ is an alias to /src
import MenuSemanal from '@/components/MenuSemanal.vue'
import Carta from '@/components/Carta.vue'

export default {
    name: 'Menu', components: {MenuSemanal, Carta}
}
</script>
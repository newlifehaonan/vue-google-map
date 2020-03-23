<template>
    <div>
        <p>Hello!</p>
        <p>{{mapData.type}}</p>
    </div>
</template>
<script>
export default {
    props: {
        mapData: {
            type: Object,
            default: () => {}
        }
    }
}
</script>
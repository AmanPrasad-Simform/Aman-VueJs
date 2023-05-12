<template>
<div>
    <Navbar />
    <!-- <transition name="fade"> -->
        <router-view></router-view>
    <!-- </transition> -->
</div>
</template>

<script></script>
<style scoped>
.fade-enter-from{
opacity: 0.5;
}
.fade-enter-to{
opacity: 1;
}
.fade-enter-active{
    transform:translateY(-50,-50);
}
.fade-leave-from{
opacity: 1;

}
.fade-leave-to{
opacity: 0.5;
}
.fade-leave-active{
      transform:translateY(-50,-50);
}

</style>
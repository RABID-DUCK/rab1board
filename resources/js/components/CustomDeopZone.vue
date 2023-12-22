<template>
    <div  class="block-images">
        <div  :class="{'output-images': Object.keys(this.images).length > 0}">
            <a v-if="formImages" v-for="image in formImages" :href="'/storage/'+image.image" target="_blank">
                <img class="dz-images" :src="'/storage/'+image.image" width="250" height="100">
            </a>
        </div>
        <div class="w-100 h-100 field-dz" v-bind="getRootProps()">
            <input v-bind="getInputProps()" />
            <p class="text-center" v-if="isDragActive">Перетащите файлы сюда ...</p>
            <p class="text-center" v-else>Перетащите файлы сюда или нажмите</p>
        </div>
    </div>
</template>

<script>
import { useDropzone } from "vue3-dropzone";
import { ref } from 'vue'

export default {
    name: "CustomDeopZone",
    props: ['deskInfo', 'images', 'url'],
    emits: ['imagesUpdate'],
    setup(props, context) {
        const url = props.url;
        const dataImages = ref(0);

        const saveFiles = (files) => {
            const formData = new FormData();
            for (let x = 0; x < files.length; x++) {
                formData.append("images[]", files[x]);
            }
            formData.append('desk_id', props.deskInfo.id)

            axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {
                    dataImages.value = response.data.files;
                })
        };

        function onDrop(acceptFiles, rejectReasons) {
            saveFiles(acceptFiles);
        }

        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

        return {
            getRootProps,
            getInputProps,
            ...rest,
            dataImages
        };
    },
    data() {
        return {
            formImages: this.images
        }
    },
    watch: {
        dataImages(val){
            this.formImages = val;
            this.$emit('imagesUpdate', val)
        }
    },
}
</script>

<style lang="scss" scoped>
.block-images{
    margin-bottom: 40px;
}

.dz-images{
    max-width: 150px;
    max-height: 150px;
}

.output-images{
    height: auto;
    min-height: 130px;
    display: flex;

    a{
        margin: 5px 10px;
    }
}

.field-dz{
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        background-color: black;
        opacity: 0.6;
        transition: background-color .3s, opacity .3s;
    }
}
</style>

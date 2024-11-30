<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-8 shadow-lg mx:w-3xl">
      <h2 class="text-lg font-bold mb-4">Edit Comment</h2>
      <textarea 
        v-model="commentContent" 
        class="border-gray-300 border p-2 w-full rounded" 
        placeholder="Edit your comment..."
      ></textarea>
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
        <button @click="submitEdit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  data() {
    return {
      commentContent: this.comment.Content,
    };
  },
  methods: {
    submitEdit() {
      // Emit the update event with the comment's ID and the updated content
      this.$emit('update', this.comment.CommentID, this.commentContent);
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>

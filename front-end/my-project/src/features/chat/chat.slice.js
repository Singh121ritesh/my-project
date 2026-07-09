import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {

    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }
})

export const { setChats, setCurrentChatId, setLoading, setError } = chatSlice.actions;

export default chatSlice.reducer;
//chats ={
  //"docker and aws": {
    //message:[

    //{
      //role: "user",
      //content: "I want to deploy my dockerized app on AWS",
    //},
    //{
      //role: "assistant",
      //content: "Sure! I can help you with that. First, make sure you have an AWS account and the AWS CLI installed. Then, you can use the following steps to deploy your Dockerized app on AWS:\n\n1. Create an ECS cluster.\n2. Create a task definition for your Docker container.\n3. Create a service to run your task definition.\n4. Configure a load balancer if needed.\n5. Deploy your service and monitor it.\n\nIf you need more detailed instructions or run into any issues, feel free to ask!",
    //}
  //],
  //}

//}
import containerChat from '../Database/DAO/chat.js';

const chats = new containerChat();

const messagesList = async ( data ) => {
    if (listaMensajes.length === 0) {
        return await chats.addChat({
            ...data,
            fyh: new Date().toLocaleString(),
            id: 1,
        });
    }
    await chats.addChat({
        ...data,
        fyh: new Date().toLocaleString(),
        id: listaMensajes.length + 1,
    });
};

export { messagesList };
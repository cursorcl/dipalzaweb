let getUsername = async() => {
    const key = NL_OS == 'Windows' ? 'USERNAME' : 'USER';
    let value = '';
    try {
        value = await Neutralino.os.getEnv(key);
    } catch (e) {
        console.error(e);
    }
    document.getElementById('name').innerText = `Hello ${value}`;
}

Neutralino.init();
Neutralino.events.on("ready", () => {
    getUsername();
});
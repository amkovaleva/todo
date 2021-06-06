export default {
    install: (app, reactive) => {

        const pressedKeys = reactive({
            isCtrPressed: false,
            isShiftPressed: false
        });

        let toggleKey = (isUpEvent, key) => {

            let keysToCheck = [['Control', 'Meta'], ['Shift']];

            for (let i = 0; i < keysToCheck.length; i++) {
                let keys = keysToCheck[i],
                    isKey = keys.includes(key),
                    newVal = !isUpEvent;

                if (isKey)
                    i === 0 ? pressedKeys.isCtrPressed = newVal : pressedKeys.isShiftPressed = newVal;
            }
        };

        let keyToggle = (event) => {
            toggleKey(event.type === "keyup", event.key);
        };

        document.addEventListener('keydown', keyToggle);
        document.addEventListener('keyup', keyToggle);

        app.provide('pressedKeys', pressedKeys);

    }
}
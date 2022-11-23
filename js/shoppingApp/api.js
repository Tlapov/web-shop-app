export default class api {
    constructor() {
        this.api = async () => {
            try {
                const data = await fetch("http://localhost:3500/products");
                const items = await data.json();
                return items;
            } catch (err) {
                return err
            }
        }
        return this.api();
    }
}
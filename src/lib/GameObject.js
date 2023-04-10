class GameObject{
    name = ""
    components = []
    started = false

    markedForDestory = false;

    markedDoNotDestroyOnLoad = false;


    constructor(name){
        this.name = name;
        this.addComponent(new Transform());
    }

    get transform(){
        return this.components[0]
    }

    setTransform(t){
        if(!t instanceof Transform){
            throw "tried to set transform to non transform"
        }
        this.components[0] = t;
    }

    addComponent(component){
        this.components.push(component);
        component.parent = this;
        return this;
    }


    static getObjectByName(name){
        return SceneManager.getActiveScene().gameObjects.find(gameObject=>gameObject.name == name)
    }

    static getObjectsByName(name){
        return SceneManager.getActiveScene().gameObjects.filter(gameObject => gameObject.name == name)
    }

    static find(name) {
        return GameObject.getObjectByName(name);
    }

    destroy() {
        this.markedForDestroy =  true;
    }

    doNotDestroyOnLoad(){
        this.markedDoNotDestroyOnLoad = true;
    }
    getComponent(name){
        return this.components.find(c=>c.name == name)
    }

    static instantiate(gameObject) {
        SceneManager.getActiveScene().gameObjects.push(gameObject);
        if(gameObject.start && !gameObject.started){
            gameObject.started = truegameObject.start()
        }
    }
}

window.GameObject = GameObject
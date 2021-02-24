var goatReady;
var isDragging = false;
var previousMousePos = { x: 0, y: 0 }
var scene = new THREE.Scene
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
)
camera.position.z = 5;
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);
var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor("#ffffff")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 })
var mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, 0, 0)
scene.add(light)

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, 0, 25)
scene.add(light)

var render = function () {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

window.addEventListener("mousemove", e => {
    // var y = (window.innerWidth / 2) - e.offsetX
    // var x = (window.innerHeight / 2) -  e.offsetY
    // console.log(`x:${x}, y:${y}`)
    // goat.rotation.y = y / 100
    // goat.rotation.x = x / 100
    var deltaMove = { x: e.offsetX - previousMousePos.x, y: e.offsetY - previousMousePos.y }
    if (isDragging) {
        var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            toRadians(deltaMove.y * 1), 
            toRadians(deltaMove.x * 1), 
            0, 
            'XYZ'))
        goat.quaternion.multiplyQuaternions(
            deltaRotationQuaternion, 
            goat.quaternion)
    }
    previousMousePos = { x: e.offsetX, y: e.offsetY }
    if (!isDragging)
    { 
        goat.position.setX(-((window.innerWidth / 2) - e.offsetX) / 100)
        goat.position.setY(((window.innerHeight / 2) - e.offsetY) / 100)
    }
})
window.addEventListener("mouseup", e => {
    isDragging = false
})
window.addEventListener("mousedown", e => {
    isDragging = true
})
function doGoatStuff() {
    goatReady = true;
    goat.position.set(0, 1, -4);
    goat.rotation.y = Math.PI / 2;
    goat.scale.set(0.05, 0.05, 0.05);

}
const loader = new THREE.GLTFLoader();
var goat;
loader.load('goat/scene.gltf', function (gltf) {
    goat = gltf.scene;
    scene.add(goat);
    doGoatStuff()

}, // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log(`An error happened: ${error}`);

    });


function toRadians(angle) {
    return angle * (Math.PI / 180);
}
render()

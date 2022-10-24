import * as THREE from 'three'
import debounce from 'lodash-es/debounce'
import pearl from '@/assets/imgs/pearl.jpg'

export default class ThreeJs {
  scene: THREE.Scene | null = null
  camera: THREE.PerspectiveCamera | null = null
  renderer: THREE.WebGLRenderer | null = null
  ambientLight: THREE.AmbientLight | null = null
  mesh: THREE.Mesh | null = null
  // canvas 容器选项
  canvasCont: HTMLCanvasElement | undefined = undefined
  contWidth: number = window.innerWidth
  contHeight: number = window.innerHeight

  constructor() {
    this.init()
  }

  init(): void {
    this.setContainer()
    // 第一步新建一个场景
    this.scene = new THREE.Scene()
    this.setRenderer()
    this.setCamera()
    this.setCube()
    this.animate()
    window.addEventListener('resize', debounce(this.handleResize.bind(this), 300), false)
  }

  // 窗口改动
  handleResize() {
    this.setContainer()
    if (this.camera) {
      this.camera.aspect = this.contWidth / this.contHeight
      this.camera.updateProjectionMatrix()
    }
    this.renderer?.setSize(this.contWidth, this.contHeight)
    console.log('after resize')
  }

  // 设置容器和尺寸
  setContainer() {
    const canvasBox = document.querySelector('#canvas-box') as HTMLCanvasElement | null
    const canvasContainer = document.querySelector('#canvas-3d') as HTMLCanvasElement | null
    if (canvasBox && canvasContainer) {
      this.canvasCont = canvasContainer
      canvasContainer.style.width = `${canvasBox.offsetWidth}px`
      canvasContainer.style.height = `${canvasBox.offsetHeight}px`
      this.contWidth = canvasBox.offsetWidth
      this.contHeight = canvasBox.offsetHeight
    }
  }

  // 新建透视相机
  setCamera(): void {
    // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
    this.camera = new THREE.PerspectiveCamera(75, this.contWidth / this.contHeight, 0.1, 1000)
    this.camera.position.z = 5
  }

  // 设置渲染器
  setRenderer(): void {
    if (this.canvasCont) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasCont })
    } else {
      this.renderer = new THREE.WebGLRenderer()
      document.body.appendChild(this.renderer.domElement)
    }
    // 设置画布的大小
    this.renderer?.setSize(this.contWidth, this.contHeight)
  }

  // 设置环境光
  setLight(): void {
    if (this.scene) {
      this.ambientLight = new THREE.AmbientLight(0xffffff) // 环境光
      this.scene.add(this.ambientLight)
    }
  }

  // 创建网格模型
  setCube(): void {
    if (this.scene) {
      const geometry = new THREE.BoxGeometry() //创建一个立方体几何对象Geometry
      // const material = new THREE.MeshBasicMaterial({ color: 0xff3200 }); //材质对象Material
      const texture = new THREE.TextureLoader().load(pearl) //首先，获取到纹理
      const material = new THREE.MeshBasicMaterial({ map: texture }) //然后创建一个phong材质来处理着色，并传递给纹理映射
      const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
      this.scene.add(mesh) //网格模型添加到场景中
      this.mesh = mesh
      this.render()
    }
  }

  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  // 动画
  animate(): void {
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this))
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.render()
    }
  }
}

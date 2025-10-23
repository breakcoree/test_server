// @region_fast_debug
function print(aaa) {
    console.log(aaa)
}
// @endregion_fast_debug


print('loaded')


// @region_vars
let search_button = document.getElementById('search_button')
let note_input = document.getElementById('note_input')

let new_note_button = document.getElementById('new_note_button')
let notes_container = document.getElementById('notes_container')

let tags_container = document.getElementsByClassName('tags_container')
let tags_item = document.getElementById('tags_item')

let modal_window = document.getElementById('modal_window')
let modal_content = document.getElementById('modal_content')
let modal_input = document.getElementById('modal_input')
let modal_dropdown = document.getElementById('modal_dropdown')
let active_tag = 1




// @region_vars_const
const tags = [
    {
        id:1,
        title:'Все'   
    },
    {
        id:2,
        title:'Идеи'    
    },
    {
        id:3,
        title:'Личное'    
    },
    {
        id:4,
        title:'Работа'    
    },
    {
        id:5,
        title:'Список покупок'    
    }
]
const notes = []
// @endregion_vars

// @region_funcs_etc

function func_create_note(note_title, note_tag) {
    id_last = notes.length + 1
    asd = {id: id_last, title: note_title, tag: note_tag, updateAt: new Date().toDateString()}
    notes.push(asd)
    render()
}


function create_note(note){
    const element = document.createElement('div')
    element.classList.add('note')

    const date = document.createElement('div')
    date.classList.add('note_date')
    date.innerText = new Date().toDateString()

    const title = document.createElement('div')
    title.innerText = note.title
    title.classList.add('note_title')

    const tag = document.createElement('div')
    tag.classList.add('note_tag')
    tag.innerText = tags.find( obj => obj.id === note.tag).title
    
    element.appendChild(title)
    element.appendChild(tag)
    element.appendChild(date)
    return element
}

function create_tag(tag){
    const element = document.createElement('li')
    element.classList.add('tags_item')
    element.innerText = tag.title
    return element
}

function get_notes(search_value){
    const flitered_notes = notes.filter(function(i) {
        return i.title.includes(search_value)
    })
    return flitered_notes
}

function render_menu(){
    for(let tag of tags){
        const element = create_tag(tag)
        element.addEventListener('click', function() {
            active_tag = tag.id
            render()
        })
        notes_container.appendChild(element)
    }
}

function render(){
    //print('asdadsadssad12d23d')
    notes_container.innerHTML=''
    let filtered = get_notes(note_input.value)

    if (active_tag !== 1){
        filtered = filtered.filter(i => i.tag === active_tag)

    }
    if(filtered.length === 0){
        notes_container.innerText = 'Ничего не найдено'
        return
    }
    for (let i of filtered){
        const element = create_note(i)
        notes_container.appendChild(element)
    }

}
function init(){
    render_menu()
    render()
    search_button.addEventListener('click', render)
}
init()
// @endregion_funcs_etc

// @region_hooks
new_note_button.addEventListener('click', function() {
    // print(window.getComputedStyle(modal_window).display)
    // window.getComputedStyle(modal_window).display === 'none' ? modal_window.style.display = 'flex' : modal_window.style.display = 'none'
    modal_window.style.display = 'flex'
}) // new_note_button.addEventListener('click', function() {func_create_note('3rf', 3)})

modal_button.addEventListener('click', function() {
    func_create_note(modal_input.value, Number(modal_dropdown.value))
    modal_window.style.display = 'none'
})

document.addEventListener('keydown', function(k) {
    if (k.key === 'Escape' || k.code === 'Escape') {
        modal_window.style.display = 'none'
    }
})

note_input.addEventListener('keydown', function(k) {
    if (k.key === 'Enter' || k.code === 'Enter') {
        //print('asdasdads'); 
        search_button.click()
    }
})

document.addEventListener('click', function(e) {
    const clicked_element = e.target
    if (clicked_element.classList.contains('tags_item')) {
        const tagTitle = clicked_element.innerText
        const tag = tags.find(t => t.title === tagTitle)
        if (tag) {
            active_tag = tag.id
            render()
        }
    }
})

// @endregion_hooks
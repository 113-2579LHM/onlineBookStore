let books1 = ['白眉大侠', '百年孤独', '多情剑客无情剑', '黑暗的左手', '黎明之街', '历七剑下天山', '陆小凤传奇', '平凡的世界', '平面国', '三体', '射雕英雄传', '神雕侠侣', '天钧', '天龙八部', '献给阿尔吉侬的花束', '笑傲江湖', '银河帝国', '永恒的终结'];





// 创建书籍数据库
function creatBookCash1() {
    for (let i = 0; i < books1.length; i++) {
        localStorage.setItem('book.' + books1[i],'')
    }
    let Count = localStorage.getItem('bookCount');
    console.log(Count);
    localStorage.setItem('bookCount', books1.length);
}

/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-22 14:41:11
 */
let allMusic = [
  {
    name: '神武雨霖铃',
    artist: '啊俏',
    img: 'music1',
    src: 'music-1',
  },
  {
    name: '牵丝戏',
    artist: '银临',
    img: 'music2',
    src: 'music-2',
  },
  {
    name: '杏花弦外雨',
    artist: '司夏',
    img: 'music3',
    src: 'music-3',
  },
  {
    name: '势在必行',
    artist: '陈势安',
    img: 'music4',
    src: 'music-4',
  },
  {
    name: '春亭雪',
    artist: '橙翼',
    img: 'music5',
    src: 'music-5',
  },
  {
    name: '第三十八年夏至',
    artist: '河图',
    img: 'music6',
    src: 'music-6',
  },
];

// 主容器
const wrapper = document.querySelector('.wrapper'),
  // 封面
  musicImg = wrapper.querySelector('.img-area img'),
  //   歌曲名
  musicName = wrapper.querySelector('.song-details .name'),
  //   唱作者
  musicArtist = wrapper.querySelector('.song-details .artist'),
  //   播放器
  mainAudio = wrapper.querySelector('#main-audio'),
  //   播放/暂停按钮
  playPauseBtn = wrapper.querySelector('.play-pause'),
  //   上一曲
  prevBtn = wrapper.querySelector('#prev'),
  //   下一曲
  nextBtn = wrapper.querySelector('#next'),
  //   进度条
  progressBar = wrapper.querySelector('.progress-bar'),
  //   进度条容器
  progressArea = wrapper.querySelector('.progress-area'),
  //   当前时间
  musicCurrentTime = wrapper.querySelector('.current'),
  // 音乐总时长
  musicDuration = wrapper.querySelector('.duration'),
  //   播放模式按钮
  repeatBtn = wrapper.querySelector('#repeat-plist'),
  // 歌单容器
  musicList = wrapper.querySelector('.music-list'),
  // 歌单按钮
  showMoreBtn = wrapper.querySelector('#more-music'),
  // 关闭歌单按钮
  hideMusicBtn = musicList.querySelector('#close');

//   正在播放的音乐序号
let musicIndex = 3;

window.addEventListener('load', () => {
  loadMusic(musicIndex);
  // 重新计算列表样式
  playingNow();
});

//  加载音乐
function loadMusic(indexNumb) {
  // 音乐名
  musicName.innerText = allMusic[indexNumb - 1].name;
  //   唱作人名
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  //   封面
  musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
  //   音乐源
  mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
  playingNow();
}

// 播放音乐
function playMusic() {
  // 先给外层容器写上一个播放音乐的类标识
  wrapper.classList.add('paused');
  //   改变类进而改变图标
  playPauseBtn.querySelector('i').className = 'fas fa-pause';
  // 然后播放音乐
  mainAudio.play();
  // 重新计算列表样式
  playingNow();
}

// 暂停音乐
function pauseMusic() {
  // 移除播放标识
  wrapper.classList.remove('paused');
  //   改变类进而改变图标
  playPauseBtn.querySelector('i').className = 'fas fa-play';
  //   暂停播放
  mainAudio.pause();
  // 重新计算列表样式
  playingNow();
}

// 下一曲
function nextMusic() {
  //   改变当前值
  musicIndex++;
  //   边界判定
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  //   重新加载音乐
  loadMusic(musicIndex);
  //   播放
  playMusic();
  // 重新计算列表样式
  playingNow();
}

// 上一曲
function prevMusic() {
  //   改变当前值
  musicIndex--;
  //   边界判定
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  //   重新加载音乐
  loadMusic(musicIndex);
  //   播放
  playMusic();
  // 重新计算列表样式
  playingNow();
}

// 为播放/暂停按钮绑定监听事件
playPauseBtn.addEventListener('click', () => {
  const isMusicPaused = wrapper.classList.contains('paused');
  isMusicPaused ? pauseMusic() : playMusic();
  // 重新计算列表样式
  playingNow();
});

// 为下一曲按钮绑定监听事件
nextBtn.addEventListener('click', () => {
  nextMusic();
});

// 为上一曲绑定监听事件
prevBtn.addEventListener('click', () => {
  prevMusic();
});

// 根据当前播放的进度改变进度条
mainAudio.addEventListener('timeupdate', e => {
  //   得到当前播放的时间
  const currentTime = e.target.currentTime;
  // 得到总时长
  const duration = e.target.duration;
  // 相除乘于100后就可以得到百分比数
  let progresswidt = (currentTime / duration) * 100;
  //   改变进度条的宽度即可
  progressBar.style.width = progresswidt + '%';
  // 当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生loadeddata事件）
  //   之所以在这里得到总时长是因为外面的timeupdate事件第一次调用时没有总时长这个参数的。只有当前时间
  mainAudio.addEventListener('loadeddata', () => {
    // 得到音乐总时长
    let audioDuration = mainAudio.duration;
    // 计算得到分钟
    let totalMin = Math.floor(audioDuration / 60);
    // 计算得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
    let totalSec = Math.floor(audioDuration % 60);
    // 不足10s补0
    if (totalSec < 10) {
      totalSec = '0' + totalSec;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currMin = Math.floor(currentTime / 60);
  // 得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
  let currSec = Math.floor(currentTime % 60);
  // 不足10s补0
  if (currSec < 10) {
    currSec = '0' + currSec;
  }
  //   改变播放条上的当前时间和总时间
  musicCurrentTime.innerText = `${currMin}:${currSec}`;
});

// 点击进度条容器触发的事件（因为进度条的长度是变化所以不能使用进度条）
progressArea.addEventListener('click', e => {
  // 得到进度条的宽度
  let progressWidthval = progressArea.clientWidth;
  // 得到点击位置的x坐标（相对于进度条）
  let clickedOffSetX = e.offsetX;
  //   得到播放总时长
  let songDuration = mainAudio.duration;

  //  改变当前的时间
  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playMusic();
});

// 点击播放模式按钮
repeatBtn.addEventListener('click', () => {
  // 得到当前模式,因为类名是 fas fa-xxx模式的，取后面的值
  let curModel = repeatBtn.className.split(' ')[1];

  switch (curModel) {
    case 'fa-redo-alt':
      repeatBtn.className = 'fas fa-sync-alt';
      repeatBtn.setAttribute('title', '单曲循环');
      break;
    case 'fa-sync-alt':
      repeatBtn.className = 'fas fa-random';
      repeatBtn.setAttribute('title', '随机播放');
      break;
    case 'fa-random':
      repeatBtn.className = 'fas fa-redo-alt';
      repeatBtn.setAttribute('title', '顺序播放');
  }
});

// 当播放完一首歌时接下来要做的事情,根据播放模式决定
mainAudio.addEventListener('ended', () => {
  // 得到当前模式,因为类名是 fas fa-xxx模式的，取后面的值
  let curModel = repeatBtn.className.split(' ')[1];

  switch (curModel) {
    // 顺序播放就下一曲
    case 'fa-redo-alt':
      nextMusic();
      break;
    case 'fa-sync-alt':
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case 'fa-random':
      //  创造一个随机数,0-1之间的随机数+1取整
      let randindex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randindex = Math.floor(Math.random() * allMusic.length + 1);
      } while (randindex == musicIndex);
      musicIndex = randindex;
      loadMusic(musicIndex);
      playMusic();
      // 重新计算列表样式
      playingNow();
      break;
  }
});

// 点击音乐列表按钮时打开列表
showMoreBtn.addEventListener('click', () => {
  musicList.classList.toggle('show');
});

// 点击关闭列表按钮
hideMusicBtn.addEventListener('click', () => {
  showMoreBtn.click();
});

// 循环生成列表内的数据
const ulTag = wrapper.querySelector('ul');
for (let index = 0; index < allMusic.length; index++) {
  let liTag = `
    <li li-index="${index + 1}">
        <div class="row">
        <span>${allMusic[index].name}</span>
        <p>${allMusic[index].artist}</p>
        </div>
        <audio class="${allMusic[index].src}" 
               src="music/${allMusic[index].src}.mp3">
        </audio>
        <span id="${allMusic[index].src}" class="audio-duration">3:40</span>
    </li>
  `;
  // 插入在结束标签之后
  ulTag.insertAdjacentHTML('beforeend', liTag);

  // li下面那个span实例，用来修改音乐时长
  let liAudioDuration = ulTag.querySelector(`#${allMusic[index].src}`);
  // li下面的播放器实例
  let liAudioTag = ulTag.querySelector(`.${allMusic[index].src}`);

  // 通过播放器实例得到音乐时长
  liAudioTag.addEventListener('loadeddata', () => {
    // 得到音乐总时长
    let audioDuration = liAudioTag.duration;
    // 计算得到分钟
    let totalMin = Math.floor(audioDuration / 60);
    // 计算得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
    let totalSec = Math.floor(audioDuration % 60);
    // 不足10s补0
    if (totalSec < 10) {
      totalSec = '0' + totalSec;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    // 将每首歌的时长保留到标签上，后续切歌用于回写音乐时长，从Playing回写
    liAudioDuration.setAttribute('t-duration', `${totalMin}:${totalSec}`);
  });
}

// 得到所有的li标签
const allLiTags = ulTag.querySelectorAll('li');

// 计算正在播放的并处理样式
function playingNow() {
  console.log('执行这里');

  for (let index = 0; index < allLiTags.length; index++) {
    // 得到正在播放的标签
    let audioTag = allLiTags[index].querySelector('.audio-duration');
    // 进来的时候先移除上一个已经有的，防止出现重复
    if (allLiTags[index].classList.contains('playing')) {
      allLiTags[index].classList.remove('playing');
      // 回写时长
      audioTag.innerText = audioTag.getAttribute('t-duration');
    }
    // 给当前播放的音乐行添加一个类
    if (allLiTags[index].getAttribute('li-index') == musicIndex) {
      allLiTags[index].classList.add('playing');
      // 给正在播放的歌时间改成playing
      audioTag.innerText = 'Playing';
    }

    // 给所有的li行添加点击事件
    allLiTags[index].setAttribute('onclick', 'clicked(this)');
  }
}

function clicked(ele) {
  // 得到点击行
  let getLiIndex = ele.getAttribute('li-index');
  // 改变当前播放的音乐
  musicIndex = getLiIndex;
  // 重新加载音乐
  loadMusic(musicIndex);
  // 播放
  playMusic();
}

async function partitionRandom(ele, l, r){
    console.log('In partitionRandom()');
    // color pivot element
    pivot = l + 1 + Math.floor(Math.random() * (r - l))
    ele[pivot].style.background = 'red';
    pivotHeight = ele[pivot].style.height;
    console.log(pivotHeight);
    indices = [...Array(r - l + 1).keys()].map(x => x + l)
    console.log(indices)
    left = indices.filter(j => j != pivot && parseInt(ele[j].style.height) <= parseInt(pivotHeight)).map(j => ele[j].style.height);
    right = indices.filter(j => j != pivot && parseInt(ele[j].style.height) > parseInt(pivotHeight)).map(j => ele[j].style.height);
    console.log(left);
    let i = l;
    for (const h of left) {
        // ele[i].style.background = 'blue';
        ele[i].style.background = 'yellow';
        ele[i].style.height = h;
        await waitforme(delay);
        // ele[i].style.background = 'yellow';
        i++;
    }
    ele[i].style.height = pivotHeight;
    ele[i].style.background = 'green';
    i++;
    for (const h of right) {
        // ele[i].style.background = 'blue';
        ele[i].style.background = 'yellow';
        ele[i].style.height = h;
        await waitforme(delay);
        // ele[i].style.background = 'yellow';
        i++;
    }
    // pauseChamp
    await waitforme(delay);
    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background === 'yellow')
            ele[k].style.background = 'cyan';
    }

    return l + left.length;
}
async function partitionLomuto(ele, l, r){
    console.log('In partitionLomuto()');
    let i = l - 1;
    // color pivot element
    ele[r].style.background = 'red';
    for(let j = l; j <= r - 1; j++){
        console.log('In partitionLomuto for j = ' + j);
        // color current element
        ele[j].style.background = 'yellow';
        // pauseChamp
        await waitforme(delay);

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            console.log('    In if partitionLomuto for j = ' + j);
            console.log('i = ' + i + ';   j = ' + j);
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            // pauseChamp
            await waitforme(delay);
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    // pauseChamp
    await waitforme(delay);
    swap(ele[i], ele[r]); // pivot height one
    console.log(`i = ${i}`, typeof(i));

    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = 'cyan';
    }

    return i;
}

async function quickSort(ele, l, r){
    console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
    if(l < r) {
        // let pivot_index = await partitionLomuto(ele, l, r);
        let pivot_index = await partitionRandom(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else if(l >= 0 && r >= 0 && l < ele.length && r < ele.length){
        // if (ele[l].style.background != 'red')
            ele[l].style.background = 'green';
        // if (ele[r].style.background != 'red')
            ele[r].style.background = 'green';
    }
}


const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSort(ele, 0, ele.length - 1);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

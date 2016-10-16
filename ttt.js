$(document).ready(function(){

	$('.ttt-cell').click(function(){
		//don't allow a click if...
		if (
			!$(this).hasClass('blank') //the cell allready has an X or O
			|| tttGameIsOver()
		)
		{
			return;
		}

		var currentPlayer = tttGetCurrentPlayer(); //are we clicking X or O

		tttSetCellContent(this, currentPlayer); //set X or O on this cell

		var winLine = tttDetectWinLine(currentPlayer); //did the current player just win?
		if (winLine)
		{
			tttWin(currentPlayer, winLine); //update interface to reflect win
		}

	});

});

//return the line class of a win for a nought or a cross player
function tttDetectWinLine(currentPlayer)
{
	//check to see if anyone has won by checking all possible lines of 3
	var winLines = ['row-1','row-2','row-3','col-1','col-2','col-3','slash','backslash'];

	//select each line of three that has this click's piece
	for (var i = 0; i < winLines.length; i++)
	{
		//e.g. .cross.row-1 to see how many crosses are in row 1
		var classSelector = '.' + currentPlayer + '.' + winLines[i];

		//are there three Xs or Os in this line
		if ($(classSelector).length == 3)
		{
			return winLines[i];
		}
	}
	return null;
}

//Whose turn is it?
function tttGetCurrentPlayer()
{
	//if there are an even number of empty cells, it's an O (let's take turns)
	if( $('.blank').length % 2 == 0)
	{
		return 'nought';
	}
	return 'cross';
}

//set the background image of the cell, add nought or cross class, remove blank class
function tttSetCellContent(cell, currentPlayer)
{

	//assume it's an X
	var bgImg = 'url(img/crosses.png)';

	if( currentPlayer == 'nought')
	{
		bgImg = 'url(img/noughts.png)';
	}

	//set new background image
	$(cell).css({
			'background' : bgImg,
			'background-position' : $(cell).css('background-position') //preserve position
			});

	//set new class
	$(cell).removeClass('blank');
	$(cell).addClass(currentPlayer);
}

function tttGameIsOver()
{
	if (
		$('.win-line').length //the came has already been won
		|| !$('.blank').length //no blank cells
	)
	{
		return true;
	}
	return false;
}

//update the interface to reflect game over.
function tttWin(currentPlayer, winLineClass)
{
	//make this the winning line
	$('.' + winLineClass).addClass('win-line');

	var winMessage = 'X Wins';
	if (currentPlayer == 'nought')
	{
		winMessage = 'O Wins';
	}

	$('#ttt-container').after('<div id="win-status">' + winMessage + '</div>');
}

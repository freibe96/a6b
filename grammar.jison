/* description: Grammar for SLang 1 */

/* lexical grammar */
%lex

DIGIT		      [0-9]
LETTER		      [a-zA-Z]

%%

\s+                                   { /* skip whitespace */ }
"fn"				      { return 'FN'; }
"("                   		      { return 'LPAREN'; }
")"                   		      { return 'RPAREN'; }
"+"                   		      { return 'PLUS'; }
"*"                   		      { return 'TIMES'; }
"/"                   		      { return 'DIV'; }
"->"                   		      { return 'FILTER'; }
"%"                   		      { return 'MOD'; }
"-"                   		      { return 'SUB'; }
"~"                   		      { return 'NEG'; }
"not"                   		      { return 'NOT'; }
"hd"                   		      { return 'HD'; }
"isNull"                   		      { return 'ISNULL'; }
"::"                   		      { return 'CONS'; }
"tl"                   		      { return 'TL'; }
"["                   		      { return 'LBRACKET'; }
"]"                   		      { return 'RBRACKET'; }
"add1"                                { return 'ADD1'; }
","                   		      { return 'COMMA'; }
"=>"                   		      { return 'THATRETURNS'; }
"==="                   		      { return 'EQUALS'; }
">"                   		      { return 'GTHAN'; }
"<"                   		      { return 'LTHAN'; }
{LETTER}({LETTER}|{DIGIT}|_)*  	      { return 'VAR'; }
{DIGIT}+                              { return 'INT'; }
<<EOF>>               		      { return 'EOF'; }
.                     		      { return 'INVALID'; }

/lex

%start program

%% /* language grammar */

program
    : exp EOF
        { return SLang.absyn.createProgram($1); }
    ;

exp
    : var_exp       { $$ = $1; }
    | intlit_exp    { $$ = $1; }
    | fn_exp        { $$ = $1; }
    | app_exp       { $$ = $1; }    
    | prim_app_exp1  { $$ = $1; }
    | prim_app_exp2  { $$ = $1; }
    | lst_exp       { $$ = $1; }
    ;

lst_exp
    :  LBRACKET ints RBRACKET
        { $$ = SLang.absyn.createListExp($2); }
    ;

ints 
    : /* empty */ { $$ = [ ]; }
    | INT more_ints
    { var result;
          if ($2 === [ ])
	     result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }
    ;

more_ints
    : /* empty */ { $$ = [ ] }
    | COMMA INT more_ints { $3.unshift($2); $$ = $3; }
    ;

var_exp
    : VAR  { $$ = SLang.absyn.createVarExp( $1 ); }
    ;

intlit_exp
    : INT  { $$ =SLang.absyn.createIntExp( $1 ); }
    ;

fn_exp
    : FN LPAREN formals RPAREN THATRETURNS exp
           { $$ = SLang.absyn.createFnExp($3,$6); }
    ;

formals
    : /* empty */ { $$ = [ ]; }
    | VAR moreformals 
        { var result;
          if ($2 === [ ])
	     result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }
    ;

moreformals
    : /* empty */ { $$ = [ ] }
    | COMMA VAR moreformals 
       { $3.unshift($2); 
         $$ = $3; }
    ;

app_exp
    : LPAREN exp args RPAREN
       {  $3.unshift("args");
          $$ = SLang.absyn.createAppExp($2,$3); }
    ;

prim_app_exp1
    : prim_op1 LPAREN prim_args RPAREN
       { $$ = SLang.absyn.createPrimAppExp1($1,[$3]); }
    ;

prim_op1
    :  ADD1     { $$ = $1; }
    |  NEG      { $$ = $1; }
    |  NOT      { $$ = $1; }
    |  HD      { $$ = $1; }
    |  ISNULL      { $$ = $1; }
    |  TL      { $$ = $1; }
    ;

prim_app_exp2
    :  LPAREN prim_args prim_op2 prim_args RPAREN
       { $$ = SLang.absyn.createPrimAppExp2($3, [$2, $4]); }
    ;

prim_op2
    :  PLUS     { $$ = $1; }
    |  TIMES    { $$ = $1; }
    |  SUB      { $$ = $1; }
    |  DIV      { $$ = $1; }
    |  MOD      { $$ = $1; }
    |  EQUALS      { $$ = $1; }
    |  GTHAN      { $$ = $1; }
    |  LTHAN     { $$ = $1; }
    |  CONS      { $$ = $1; }
    |  FILTER      { $$ = $1; }
    ;



args
    : /* empty */ { $$ = [ ]; }
    | exp args
        { var result;
          if ($2 === [ ])
	     result = [ $1 ];
          else {
             $2.unshift($1);
             result = $2;
          }
          $$ = result;
        }    ;

prim_args
    :  /* empty */ { $$ = [ ]; }
    |  exp 
    ;


%%


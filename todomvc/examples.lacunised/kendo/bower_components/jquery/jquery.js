// LACUNA LAZY LOAD FALLBACK
function lacuna_lazy_load(id, callback){
    fetch("http://127.0.0.1:8125/lazyload/", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({id})
    }).then(response => {
        return response.text();
    }).then(callback);
}
/*!
 * jQuery JavaScript Library v2.1.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:10Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {lacuna_lazy_load("bower_components/jquery/jquery.js[898:1028]", functionData => eval(functionData))};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {lacuna_lazy_load("bower_components/jquery/jquery.js[2258:2293]", functionData => eval(functionData))};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[2546:2579]", functionData => eval(functionData))},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {lacuna_lazy_load("bower_components/jquery/jquery.js[2713:2882]", functionData => eval(functionData))},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {lacuna_lazy_load("bower_components/jquery/jquery.js[3016:3288]", functionData => eval(functionData))},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[3560:3677]", functionData => eval(functionData))},

	slice: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[3699:3762]", functionData => eval(functionData))},

	first: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[3784:3811]", functionData => eval(functionData))},

	last: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[3832:3860]", functionData => eval(functionData))},

	eq: function( i ) {lacuna_lazy_load("bower_components/jquery/jquery.js[3882:4009]", functionData => eval(functionData))},

	end: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[4029:4085]", functionData => eval(functionData))},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {lacuna_lazy_load("bower_components/jquery/jquery.js[6029:6059]", functionData => eval(functionData))},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {lacuna_lazy_load("bower_components/jquery/jquery.js[6471:6713]", functionData => eval(functionData))},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {lacuna_lazy_load("bower_components/jquery/jquery.js[8010:8580]", functionData => eval(functionData))},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[8857:8939]", functionData => eval(functionData))},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {lacuna_lazy_load("bower_components/jquery/jquery.js[10253:10315]", functionData => eval(functionData))},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {lacuna_lazy_load("bower_components/jquery/jquery.js[11022:11612]", functionData => eval(functionData))},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[14248:14379]", functionData => eval(functionData))},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {lacuna_lazy_load("bower_components/jquery/jquery.js[17656:18070]", functionData => eval(functionData))};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {lacuna_lazy_load("bower_components/jquery/jquery.js[18431:18485]", functionData => eval(functionData))} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {lacuna_lazy_load("bower_components/jquery/jquery.js[18565:18708]", functionData => eval(functionData))}
	};
}

function Sizzle( selector, context, results, seed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[18768:21735]", functionData => eval(functionData))}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[22080:22343]", functionData => eval(functionData))}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {lacuna_lazy_load("bower_components/jquery/jquery.js[23487:23876]", functionData => eval(functionData))}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[24028:24123]", functionData => eval(functionData))};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[24275:24393]", functionData => eval(functionData))};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {lacuna_lazy_load("bower_components/jquery/jquery.js[24568:24909]", functionData => eval(functionData))});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[25132:25219]", functionData => eval(functionData))}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {lacuna_lazy_load("bower_components/jquery/jquery.js[26866:26891]", functionData => eval(functionData))}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {lacuna_lazy_load("bower_components/jquery/jquery.js[26985:27010]", functionData => eval(functionData))});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[28567:28852]", functionData => eval(functionData))};
		Expr.filter["ID"] = function( id ) {lacuna_lazy_load("bower_components/jquery/jquery.js[28891:29030]", functionData => eval(functionData))};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {lacuna_lazy_load("bower_components/jquery/jquery.js[29182:29409]", functionData => eval(functionData))};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[29501:29624]", functionData => eval(functionData))} :
		function( tag, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[29654:29958]", functionData => eval(functionData))};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[30058:30205]", functionData => eval(functionData))};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {lacuna_lazy_load("bower_components/jquery/jquery.js[33873:34151]", functionData => eval(functionData))} :
		function( a, b ) {lacuna_lazy_load("bower_components/jquery/jquery.js[34173:34303]", functionData => eval(functionData))};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {lacuna_lazy_load("bower_components/jquery/jquery.js[34465:35556]", functionData => eval(functionData))} :
	function( a, b ) {lacuna_lazy_load("bower_components/jquery/jquery.js[35577:36698]", functionData => eval(functionData))};

	return doc;
};

Sizzle.matches = function( expr, elements ) {lacuna_lazy_load("bower_components/jquery/jquery.js[36762:36811]", functionData => eval(functionData))};

Sizzle.matchesSelector = function( elem, expr ) {lacuna_lazy_load("bower_components/jquery/jquery.js[36862:37645]", functionData => eval(functionData))};

Sizzle.contains = function( context, elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[37692:37851]", functionData => eval(functionData))};

Sizzle.attr = function( elem, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[37891:38439]", functionData => eval(functionData))};

Sizzle.error = function( msg ) {lacuna_lazy_load("bower_components/jquery/jquery.js[38473:38545]", functionData => eval(functionData))};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {lacuna_lazy_load("bower_components/jquery/jquery.js[38670:39254]", functionData => eval(functionData))};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[39415:40199]", functionData => eval(functionData))};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {lacuna_lazy_load("bower_components/jquery/jquery.js[40577:40888]", functionData => eval(functionData))},

		"CHILD": function( match ) {lacuna_lazy_load("bower_components/jquery/jquery.js[40920:41806]", functionData => eval(functionData))},

		"PSEUDO": function( match ) {lacuna_lazy_load("bower_components/jquery/jquery.js[41839:42654]", functionData => eval(functionData))}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[42710:42969]", functionData => eval(functionData))},

		"CLASS": function( className ) {lacuna_lazy_load("bower_components/jquery/jquery.js[43005:43394]", functionData => eval(functionData))},

		"ATTR": function( name, operator, check ) {lacuna_lazy_load("bower_components/jquery/jquery.js[43441:44141]", functionData => eval(functionData))},

		"CHILD": function( type, what, argument, first, last ) {lacuna_lazy_load("bower_components/jquery/jquery.js[44201:47111]", functionData => eval(functionData))},

		"PSEUDO": function( pseudo, argument ) {lacuna_lazy_load("bower_components/jquery/jquery.js[47155:48286]", functionData => eval(functionData))}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[48380:49079]", functionData => eval(functionData))}),

		"has": markFunction(function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[49126:49214]", functionData => eval(functionData))}),

		"contains": markFunction(function( text ) {lacuna_lazy_load("bower_components/jquery/jquery.js[49262:49393]", functionData => eval(functionData))}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {lacuna_lazy_load("bower_components/jquery/jquery.js[49868:50468]", functionData => eval(functionData))}),

		// Miscellaneous
		"target": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[50520:50627]", functionData => eval(functionData))},

		"root": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[50657:50690]", functionData => eval(functionData))},

		"focus": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[50721:50864]", functionData => eval(functionData))},

		// Boolean properties
		"enabled": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[50921:50961]", functionData => eval(functionData))},

		"disabled": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[50995:51034]", functionData => eval(functionData))},

		"checked": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[51067:51359]", functionData => eval(functionData))},

		"selected": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[51393:51595]", functionData => eval(functionData))},

		// Contents
		"empty": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[51640:52078]", functionData => eval(functionData))},

		"parent": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52110:52157]", functionData => eval(functionData))},

		// Element/input types
		"header": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52214:52260]", functionData => eval(functionData))},

		"input": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52291:52337]", functionData => eval(functionData))},

		"button": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52369:52492]", functionData => eval(functionData))},

		"text": function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52522:52812]", functionData => eval(functionData))},

		// Position-in-collection
		"first": createPositionalPseudo(function() {lacuna_lazy_load("bower_components/jquery/jquery.js[52888:52910]", functionData => eval(functionData))}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {lacuna_lazy_load("bower_components/jquery/jquery.js[52980:53011]", functionData => eval(functionData))}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {lacuna_lazy_load("bower_components/jquery/jquery.js[53089:53153]", functionData => eval(functionData))}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {lacuna_lazy_load("bower_components/jquery/jquery.js[53223:53333]", functionData => eval(functionData))}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {lacuna_lazy_load("bower_components/jquery/jquery.js[53402:53512]", functionData => eval(functionData))}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {lacuna_lazy_load("bower_components/jquery/jquery.js[53590:53733]", functionData => eval(functionData))}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {lacuna_lazy_load("bower_components/jquery/jquery.js[53811:53958]", functionData => eval(functionData))})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {lacuna_lazy_load("bower_components/jquery/jquery.js[54467:55889]", functionData => eval(functionData))}

function toSelector( tokens ) {lacuna_lazy_load("bower_components/jquery/jquery.js[55921:56054]", functionData => eval(functionData))}

function addCombinator( matcher, combinator, base ) {lacuna_lazy_load("bower_components/jquery/jquery.js[56108:57636]", functionData => eval(functionData))}

function elementMatcher( matchers ) {lacuna_lazy_load("bower_components/jquery/jquery.js[57674:57904]", functionData => eval(functionData))}

function condense( unmatched, map, filter, context, xml ) {lacuna_lazy_load("bower_components/jquery/jquery.js[57964:58282]", functionData => eval(functionData))}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[58374:60953]", functionData => eval(functionData))}

function matcherFromTokens( tokens ) {lacuna_lazy_load("bower_components/jquery/jquery.js[60992:62875]", functionData => eval(functionData))}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {lacuna_lazy_load("bower_components/jquery/jquery.js[62943:65707]", functionData => eval(functionData))}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {lacuna_lazy_load("bower_components/jquery/jquery.js[65788:66397]", functionData => eval(functionData))};

function multipleContexts( selector, contexts, results ) {lacuna_lazy_load("bower_components/jquery/jquery.js[66457:66587]", functionData => eval(functionData))}

function select( selector, context, results, seed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[66641:68463]", functionData => eval(functionData))}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {lacuna_lazy_load("bower_components/jquery/jquery.js[69418:69520]", functionData => eval(functionData))});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {lacuna_lazy_load("bower_components/jquery/jquery.js[69838:69936]", functionData => eval(functionData))});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {lacuna_lazy_load("bower_components/jquery/jquery.js[70160:70341]", functionData => eval(functionData))});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {lacuna_lazy_load("bower_components/jquery/jquery.js[70853:71477]", functionData => eval(functionData))}

jQuery.filter = function( expr, elems, not ) {lacuna_lazy_load("bower_components/jquery/jquery.js[71524:71821]", functionData => eval(functionData))};

jQuery.fn.extend({
	find: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[71871:72486]", functionData => eval(functionData))},
	filter: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[72518:72586]", functionData => eval(functionData))},
	not: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[72615:72682]", functionData => eval(functionData))},
	is: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[72710:73040]", functionData => eval(functionData))}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {lacuna_lazy_load("bower_components/jquery/jquery.js[76608:76881]", functionData => eval(functionData))},

	sibling: function( n, elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[76914:77068]", functionData => eval(functionData))}
});

jQuery.fn.extend({
	has: function( target ) {lacuna_lazy_load("bower_components/jquery/jquery.js[77118:77344]", functionData => eval(functionData))},

	closest: function( selectors, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[77388:78049]", functionData => eval(functionData))},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[78157:78609]", functionData => eval(functionData))},

	add: function( selector, context ) {lacuna_lazy_load("bower_components/jquery/jquery.js[78648:78765]", functionData => eval(functionData))},

	addBack: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[78799:78900]", functionData => eval(functionData))}
});

function sibling( cur, dir ) {lacuna_lazy_load("bower_components/jquery/jquery.js[78935:79004]", functionData => eval(functionData))}

jQuery.each({
	parent: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79046:79141]", functionData => eval(functionData))},
	parents: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79170:79217]", functionData => eval(functionData))},
	parentsUntil: function( elem, i, until ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79261:79315]", functionData => eval(functionData))},
	next: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79341:79386]", functionData => eval(functionData))},
	prev: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79412:79461]", functionData => eval(functionData))},
	nextAll: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79490:79538]", functionData => eval(functionData))},
	prevAll: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79567:79619]", functionData => eval(functionData))},
	nextUntil: function( elem, i, until ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79660:79715]", functionData => eval(functionData))},
	prevUntil: function( elem, i, until ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79756:79815]", functionData => eval(functionData))},
	siblings: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79845:79920]", functionData => eval(functionData))},
	children: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[79950:79998]", functionData => eval(functionData))},
	contents: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[80028:80102]", functionData => eval(functionData))}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[80178:80688]", functionData => eval(functionData))};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[84281:84724]", functionData => eval(functionData))},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[84879:84962]", functionData => eval(functionData))},
			// Remove all callbacks from the list
			empty: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[85026:85086]", functionData => eval(functionData))},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[85260:85284]", functionData => eval(functionData))},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[85485:85510]", functionData => eval(functionData))},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[85930:85991]", functionData => eval(functionData))},
			// To know if the callbacks have already been called at least once
			fired: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[86084:86110]", functionData => eval(functionData))}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[86521:86547]", functionData => eval(functionData))},
				always: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[86572:86648]", functionData => eval(functionData))},
				then: function( /* fnDone, fnFail, fnProgress */ ) {lacuna_lazy_load("bower_components/jquery/jquery.js[86705:87489]", functionData => eval(functionData))},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {lacuna_lazy_load("bower_components/jquery/jquery.js[88795:90442]", functionData => eval(functionData))}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[90532:90607]", functionData => eval(functionData))};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {lacuna_lazy_load("bower_components/jquery/jquery.js[90882:90965]", functionData => eval(functionData))},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[93529:93584]", functionData => eval(functionData))};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[94403:94422]", functionData => eval(functionData))}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[95464:96204]", functionData => eval(functionData))},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[96607:97573]", functionData => eval(functionData))},
	remove: function( owner, key ) {lacuna_lazy_load("bower_components/jquery/jquery.js[97607:98707]", functionData => eval(functionData))},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {lacuna_lazy_load("bower_components/jquery/jquery.js[98853:98941]", functionData => eval(functionData))}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[100403:100472]", functionData => eval(functionData))},

	data: function( elem, name, data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[100511:100562]", functionData => eval(functionData))},

	removeData: function( elem, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[100601:100639]", functionData => eval(functionData))},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[100821:100872]", functionData => eval(functionData))},

	_removeData: function( elem, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[100912:100950]", functionData => eval(functionData))}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {lacuna_lazy_load("bower_components/jquery/jquery.js[101674:101712]", functionData => eval(functionData))});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {lacuna_lazy_load("bower_components/jquery/jquery.js[102825:103457]", functionData => eval(functionData))});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {lacuna_lazy_load("bower_components/jquery/jquery.js[103548:103624]", functionData => eval(functionData))}
});


jQuery.extend({
	queue: function( elem, type, data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[103684:104076]", functionData => eval(functionData))},

	dequeue: function( elem, type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[104112:104832]", functionData => eval(functionData))},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[104972:105205]", functionData => eval(functionData))}
});

jQuery.fn.extend({
	queue: function( type, data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[105261:105750]", functionData => eval(functionData))},
	dequeue: function( type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[105779:105854]", functionData => eval(functionData))},
	clearQueue: function( type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[105886:105931]", functionData => eval(functionData))},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {lacuna_lazy_load("bower_components/jquery/jquery.js[106066:106585]", functionData => eval(functionData))}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {lacuna_lazy_load("bower_components/jquery/jquery.js[106741:106975]", functionData => eval(functionData))};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) );

	// #11217 - WebKit loses check when the name is after the checked attribute
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {lacuna_lazy_load("bower_components/jquery/jquery.js[108007:108024]", functionData => eval(functionData))}

function returnFalse() {
	return false;
}

function safeActiveElement() {lacuna_lazy_load("bower_components/jquery/jquery.js[108098:108162]", functionData => eval(functionData))}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {lacuna_lazy_load("bower_components/jquery/jquery.js[109264:109537]", functionData => eval(functionData))};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[117983:119798]", functionData => eval(functionData))},

	handlers: function( event, handlers ) {lacuna_lazy_load("bower_components/jquery/jquery.js[119840:121185]", functionData => eval(functionData))},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {lacuna_lazy_load("bower_components/jquery/jquery.js[121509:121685]", functionData => eval(functionData))}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {lacuna_lazy_load("bower_components/jquery/jquery.js[121852:122746]", functionData => eval(functionData))}
	},

	fix: function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[122776:123831]", functionData => eval(functionData))},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[124054:124160]", functionData => eval(functionData))},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[124227:124331]", functionData => eval(functionData))},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[124469:124607]", functionData => eval(functionData))},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[124714:124769]", functionData => eval(functionData))}
		},

		beforeunload: {
			postDispatch: function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[124829:125029]", functionData => eval(functionData))}
		}
	},

	simulate: function( type, elem, event, bubble ) {lacuna_lazy_load("bower_components/jquery/jquery.js[125088:125610]", functionData => eval(functionData))}
};

jQuery.removeEvent = function( elem, type, handle ) {lacuna_lazy_load("bower_components/jquery/jquery.js[125667:125759]", functionData => eval(functionData))};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				// Support: Android < 4.0
				src.defaultPrevented === undefined &&
				src.getPreventDefault && src.getPreventDefault() ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[127061:127197]", functionData => eval(functionData))},
	stopPropagation: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[127228:127368]", functionData => eval(functionData))},
	stopImmediatePropagation: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[127408:127489]", functionData => eval(functionData))}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[127785:128256]", functionData => eval(functionData))}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[128582:128669]", functionData => eval(functionData))};

		jQuery.event.special[ fix ] = {
			setup: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[128727:128958]", functionData => eval(functionData))},
			teardown: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[128984:129259]", functionData => eval(functionData))}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {lacuna_lazy_load("bower_components/jquery/jquery.js[130243:130379]", functionData => eval(functionData))};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[130643:130697]", functionData => eval(functionData))},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[131714:131818]", functionData => eval(functionData))}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {lacuna_lazy_load("bower_components/jquery/jquery.js[132902:133152]", functionData => eval(functionData))}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[133268:133354]", functionData => eval(functionData))}
function restoreScript( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[133386:133542]", functionData => eval(functionData))}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {lacuna_lazy_load("bower_components/jquery/jquery.js[133638:133816]", functionData => eval(functionData))}

function cloneCopyEvent( src, dest ) {lacuna_lazy_load("bower_components/jquery/jquery.js[133855:134578]", functionData => eval(functionData))}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {lacuna_lazy_load("bower_components/jquery/jquery.js[134948:135370]", functionData => eval(functionData))}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {lacuna_lazy_load("bower_components/jquery/jquery.js[135447:136651]", functionData => eval(functionData))},

	buildFragment: function( elems, context, scripts, selection ) {lacuna_lazy_load("bower_components/jquery/jquery.js[136717:138853]", functionData => eval(functionData))},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[139822:140128]", functionData => eval(functionData))},

	append: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[140151:140382]", functionData => eval(functionData))},

	prepend: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[140406:140657]", functionData => eval(functionData))},

	before: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[140680:140825]", functionData => eval(functionData))},

	after: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[140847:141004]", functionData => eval(functionData))},

	remove: function( selector, keepData /* Internal Use Only */ ) {lacuna_lazy_load("bower_components/jquery/jquery.js[141071:141513]", functionData => eval(functionData))},

	empty: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[141535:141801]", functionData => eval(functionData))},

	clone: function( dataAndEvents, deepDataAndEvents ) {lacuna_lazy_load("bower_components/jquery/jquery.js[141857:142115]", functionData => eval(functionData))},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[143095:143526]", functionData => eval(functionData))},

	detach: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[143559:143603]", functionData => eval(functionData))},

	domManip: function( args, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[143644:145959]", functionData => eval(functionData))}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[146172:146551]", functionData => eval(functionData))};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {lacuna_lazy_load("bower_components/jquery/jquery.js[146808:147423]", functionData => eval(functionData))}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {lacuna_lazy_load("bower_components/jquery/jquery.js[147557:148288]", functionData => eval(functionData))}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[148419:148495]", functionData => eval(functionData))};



function curCSS( elem, name, computed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[148540:149779]", functionData => eval(functionData))}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[149930:150317]", functionData => eval(functionData))}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;" +
			"-moz-box-sizing:content-box;box-sizing:content-box",
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;" +
		"margin-top:1px";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {lacuna_lazy_load("bower_components/jquery/jquery.js[151248:151749]", functionData => eval(functionData))}

	// Use window.getComputedStyle because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
		jQuery.extend(support, {
			pixelPosition: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[151921:152197]", functionData => eval(functionData))},
			boxSizingReliable: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[152232:152368]", functionData => eval(functionData))},
			reliableMarginRight: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[152405:153224]", functionData => eval(functionData))}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {lacuna_lazy_load("bower_components/jquery/jquery.js[153382:153724]", functionData => eval(functionData))};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[154384:154740]", functionData => eval(functionData))}

function setPositiveNumber( elem, value, subtract ) {lacuna_lazy_load("bower_components/jquery/jquery.js[154794:155015]", functionData => eval(functionData))}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {lacuna_lazy_load("bower_components/jquery/jquery.js[155089:156257]", functionData => eval(functionData))}

function getWidthOrHeight( elem, name, extra ) {lacuna_lazy_load("bower_components/jquery/jquery.js[156306:157684]", functionData => eval(functionData))}

function showHide( elements, show ) {lacuna_lazy_load("bower_components/jquery/jquery.js[157722:159138]", functionData => eval(functionData))}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[159329:159497]", functionData => eval(functionData))}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {lacuna_lazy_load("bower_components/jquery/jquery.js[160051:162190]", functionData => eval(functionData))},

	css: function( elem, name, extra, styles ) {lacuna_lazy_load("bower_components/jquery/jquery.js[162237:163287]", functionData => eval(functionData))}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {lacuna_lazy_load("bower_components/jquery/jquery.js[163420:163849]", functionData => eval(functionData))},

		set: function( elem, value, extra ) {lacuna_lazy_load("bower_components/jquery/jquery.js[163890:164147]", functionData => eval(functionData))}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[164282:164561]", functionData => eval(functionData))}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[164780:165089]", functionData => eval(functionData))}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[165248:165716]", functionData => eval(functionData))},
	show: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[165736:165773]", functionData => eval(functionData))},
	hide: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[165793:165824]", functionData => eval(functionData))},
	toggle: function( state ) {lacuna_lazy_load("bower_components/jquery/jquery.js[165853:166083]", functionData => eval(functionData))}
});


function Tween( elem, options, prop, end, easing ) {lacuna_lazy_load("bower_components/jquery/jquery.js[166141:166214]", functionData => eval(functionData))}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {lacuna_lazy_load("bower_components/jquery/jquery.js[166337:166562]", functionData => eval(functionData))},
	cur: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[166581:166724]", functionData => eval(functionData))},
	run: function( percent ) {lacuna_lazy_load("bower_components/jquery/jquery.js[166752:167297]", functionData => eval(functionData))}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {lacuna_lazy_load("bower_components/jquery/jquery.js[167411:168035]", functionData => eval(functionData))},
		set: function( tween ) {lacuna_lazy_load("bower_components/jquery/jquery.js[168062:168552]", functionData => eval(functionData))}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {lacuna_lazy_load("bower_components/jquery/jquery.js[168724:168829]", functionData => eval(functionData))}
};

jQuery.easing = {
	linear: function( p ) {lacuna_lazy_load("bower_components/jquery/jquery.js[168875:168891]", functionData => eval(functionData))},
	swing: function( p ) {lacuna_lazy_load("bower_components/jquery/jquery.js[168915:168963]", functionData => eval(functionData))}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[169308:170897]", functionData => eval(functionData))} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {lacuna_lazy_load("bower_components/jquery/jquery.js[170987:171075]", functionData => eval(functionData))}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {lacuna_lazy_load("bower_components/jquery/jquery.js[171670:171967]", functionData => eval(functionData))}

function defaultPrefilter( elem, props, opts ) {lacuna_lazy_load("bower_components/jquery/jquery.js[172016:175321]", functionData => eval(functionData))}

function propFilter( props, specialEasing ) {lacuna_lazy_load("bower_components/jquery/jquery.js[175367:176250]", functionData => eval(functionData))}

function Animation( elem, properties, options ) {lacuna_lazy_load("bower_components/jquery/jquery.js[176300:179090]", functionData => eval(functionData))}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[179178:179515]", functionData => eval(functionData))},

	prefilter: function( callback, prepend ) {lacuna_lazy_load("bower_components/jquery/jquery.js[179560:179683]", functionData => eval(functionData))}
});

jQuery.speed = function( speed, easing, fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[179734:180523]", functionData => eval(functionData))};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[180594:180816]", functionData => eval(functionData))},
	animate: function( prop, speed, easing, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[180870:181445]", functionData => eval(functionData))},
	stop: function( type, clearQueue, gotoEnd ) {lacuna_lazy_load("bower_components/jquery/jquery.js[181492:182739]", functionData => eval(functionData))},
	finish: function( type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[182767:183791]", functionData => eval(functionData))}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[183950:184110]", functionData => eval(functionData))};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[184440:184501]", functionData => eval(functionData))};
});

jQuery.timers = [];
jQuery.fx.tick = function() {lacuna_lazy_load("bower_components/jquery/jquery.js[184556:184890]", functionData => eval(functionData))};

jQuery.fx.timer = function( timer ) {lacuna_lazy_load("bower_components/jquery/jquery.js[184929:185037]", functionData => eval(functionData))};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {lacuna_lazy_load("bower_components/jquery/jquery.js[185095:185183]", functionData => eval(functionData))};

jQuery.fx.stop = function() {lacuna_lazy_load("bower_components/jquery/jquery.js[185214:185261]", functionData => eval(functionData))};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[185509:185756]", functionData => eval(functionData))};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[186770:186847]", functionData => eval(functionData))},

	removeAttr: function( name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[186880:186958]", functionData => eval(functionData))}
});

jQuery.extend({
	attr: function( elem, name, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[187017:188207]", functionData => eval(functionData))},

	removeAttr: function( elem, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[188247:188696]", functionData => eval(functionData))},

	attrHooks: {
		type: {
			set: function( elem, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[188755:189162]", functionData => eval(functionData))}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[189256:189439]", functionData => eval(functionData))}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {lacuna_lazy_load("bower_components/jquery/jquery.js[189632:189949]", functionData => eval(functionData))};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[190066:190143]", functionData => eval(functionData))},

	removeProp: function( name ) {lacuna_lazy_load("bower_components/jquery/jquery.js[190176:190268]", functionData => eval(functionData))}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[190387:191063]", functionData => eval(functionData))},

	propHooks: {
		tabIndex: {
			get: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[191119:191249]", functionData => eval(functionData))}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[191427:191563]", functionData => eval(functionData))}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {lacuna_lazy_load("bower_components/jquery/jquery.js[192078:192154]", functionData => eval(functionData))});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[192910:194010]", functionData => eval(functionData))},

	toggleClass: function( value, stateVal ) {lacuna_lazy_load("bower_components/jquery/jquery.js[194055:195479]", functionData => eval(functionData))},

	hasClass: function( selector ) {lacuna_lazy_load("bower_components/jquery/jquery.js[195514:195773]", functionData => eval(functionData))}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[195847:197227]", functionData => eval(functionData))}
});

jQuery.extend({
	valHooks: {
		select: {
			get: function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[197299:198342]", functionData => eval(functionData))},

			set: function( elem, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[198377:198833]", functionData => eval(functionData))}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[198995:199121]", functionData => eval(functionData))}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[199202:199360]", functionData => eval(functionData))};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {lacuna_lazy_load("bower_components/jquery/jquery.js[199911:199981]", functionData => eval(functionData))},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[200099:200141]", functionData => eval(functionData))},

	delegate: function( selector, types, data, fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[200193:200244]", functionData => eval(functionData))},
	undelegate: function( selector, types, fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[200291:200448]", functionData => eval(functionData))}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[200614:200650]", functionData => eval(functionData))};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {lacuna_lazy_load("bower_components/jquery/jquery.js[200718:201062]", functionData => eval(functionData))};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {lacuna_lazy_load("bower_components/jquery/jquery.js[203708:204447]", functionData => eval(functionData))}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {lacuna_lazy_load("bower_components/jquery/jquery.js[205110:206371]", functionData => eval(functionData))}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {lacuna_lazy_load("bower_components/jquery/jquery.js[206554:208841]", functionData => eval(functionData))}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {lacuna_lazy_load("bower_components/jquery/jquery.js[210915:221690]", functionData => eval(functionData))},

	getJSON: function( url, data, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[221735:221791]", functionData => eval(functionData))},

	getScript: function( url, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[221832:221895]", functionData => eval(functionData))}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {lacuna_lazy_load("bower_components/jquery/jquery.js[222015:222294]", functionData => eval(functionData))};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {lacuna_lazy_load("bower_components/jquery/jquery.js[222520:222554]", functionData => eval(functionData))};
});


jQuery._evalUrl = function( url ) {lacuna_lazy_load("bower_components/jquery/jquery.js[222596:222725]", functionData => eval(functionData))};


jQuery.fn.extend({
	wrapAll: function( html ) {lacuna_lazy_load("bower_components/jquery/jquery.js[222775:223331]", functionData => eval(functionData))},

	wrapInner: function( html ) {lacuna_lazy_load("bower_components/jquery/jquery.js[223363:223706]", functionData => eval(functionData))},

	wrap: function( html ) {lacuna_lazy_load("bower_components/jquery/jquery.js[223733:223894]", functionData => eval(functionData))},

	unwrap: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[223917:224075]", functionData => eval(functionData))}
});


jQuery.expr.filters.hidden = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[224128:224297]", functionData => eval(functionData))};
jQuery.expr.filters.visible = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[224346:224394]", functionData => eval(functionData))};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {lacuna_lazy_load("bower_components/jquery/jquery.js[224627:225309]", functionData => eval(functionData))}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {lacuna_lazy_load("bower_components/jquery/jquery.js[225438:226452]", functionData => eval(functionData))};

jQuery.fn.extend({
	serialize: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[226497:226549]", functionData => eval(functionData))},
	serializeArray: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[226579:227426]", functionData => eval(functionData))}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {lacuna_lazy_load("bower_components/jquery/jquery.js[227944:228014]", functionData => eval(functionData))});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {lacuna_lazy_load("bower_components/jquery/jquery.js[228180:230686]", functionData => eval(functionData))});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {lacuna_lazy_load("bower_components/jquery/jquery.js[230955:231006]", functionData => eval(functionData))}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {lacuna_lazy_load("bower_components/jquery/jquery.js[231108:231210]", functionData => eval(functionData))});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {lacuna_lazy_load("bower_components/jquery/jquery.js[231294:231899]", functionData => eval(functionData))});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[232053:232182]", functionData => eval(functionData))}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {lacuna_lazy_load("bower_components/jquery/jquery.js[232333:234309]", functionData => eval(functionData))});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {lacuna_lazy_load("bower_components/jquery/jquery.js[234585:235106]", functionData => eval(functionData))};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {lacuna_lazy_load("bower_components/jquery/jquery.js[235262:236569]", functionData => eval(functionData))};




jQuery.expr.filters.animated = function( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[236623:236717]", functionData => eval(functionData))};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {lacuna_lazy_load("bower_components/jquery/jquery.js[236839:236924]", functionData => eval(functionData))}

jQuery.offset = {
	setOffset: function( elem, options, i ) {lacuna_lazy_load("bower_components/jquery/jquery.js[236985:238296]", functionData => eval(functionData))}
};

jQuery.fn.extend({
	offset: function( options ) {lacuna_lazy_load("bower_components/jquery/jquery.js[238349:239168]", functionData => eval(functionData))},

	position: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[239193:240287]", functionData => eval(functionData))},

	offsetParent: function() {lacuna_lazy_load("bower_components/jquery/jquery.js[240316:240628]", functionData => eval(functionData))}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {lacuna_lazy_load("bower_components/jquery/jquery.js[240849:241227]", functionData => eval(functionData))};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {lacuna_lazy_load("bower_components/jquery/jquery.js[241663:241890]", functionData => eval(functionData))}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {lacuna_lazy_load("bower_components/jquery/jquery.js[242277:243566]", functionData => eval(functionData))};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {lacuna_lazy_load("bower_components/jquery/jquery.js[243670:243694]", functionData => eval(functionData))};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {lacuna_lazy_load("bower_components/jquery/jquery.js[244355:244376]", functionData => eval(functionData))});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {lacuna_lazy_load("bower_components/jquery/jquery.js[244551:244695]", functionData => eval(functionData))};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

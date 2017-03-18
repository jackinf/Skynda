using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Triven.Domain.Helpers
{
    public static class ExpressionHelpers
    {
        /// <summary>
        /// Source: https://social.msdn.microsoft.com/Forums/en-US/095745fe-dcf0-4142-b684-b7e4a1ab59f0/where-in-clause?forum=adodotnetentityframework
        /// 
        /// This is just a WHERE IN query.
        /// </summary>
        /// <typeparam name="TElement"></typeparam>
        /// <typeparam name="TValue"></typeparam>
        /// <param name="valueSelector"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public static Expression<Func<TElement, bool>> BuildContainsExpression<TElement, TValue>(Expression<Func<TElement, TValue>> valueSelector, IEnumerable<TValue> values)
        {
            if (null == valueSelector)
                throw new ArgumentNullException(nameof(valueSelector));
            if (null == values)
                throw new ArgumentNullException(nameof(values));

            var p = valueSelector.Parameters.Single();
            // ReSharper disable once PossibleMultipleEnumeration
            // ReSharper disable once UseMethodAny.2 -  - kui EF kasutab, siis päring on kiirem.
            if (values.Count() == 0)
                return e => false;
            var equals = values.Select(value => (Expression)Expression.Equal(valueSelector.Body, Expression.Constant(value, typeof(TValue))));
            var body = equals.Aggregate(Expression.Or);
            return Expression.Lambda<Func<TElement, bool>>(body, p);
        }
    }
}
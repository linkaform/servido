# coding: utf-8

import string

'''
class that generates the python code class.
'''
class PyClass:

    def __init__(self):
        self.ObjectType = "Class"
        self.name = self.description = ''
        self.inhnerit_list = []
        self.sub_class_list = []
        self.function_list= []
        self.class_lines = []

    def set_name(self, val):
        self.name= val

    def set_description(self, val):
        self.description= val

    def set_inheritance(self, val):
        self.inhnerit_list.append(val)

    def add_line(self, val):
        self.class_lines.append(val)

    def add_subclass(self, val):
        self.sub_class_list.append(val)

    def add_function(self, val):
        self.function_list.append(val)

    def ident(self, val =1):
        val2 = ' '
        return  ((4*val)*val2)

    def line_break(self, val):
        return val*'\n'

    def __repr__(self):
        res= "class %s"%(self.name, )
        for pos, inheritance in enumerate(self.inhnerit_list):
            if pos == 0:
                res += '('
            if pos > 0:
                res += ', '
            res += inheritance
        if self.inhnerit_list:
            res += ')'
        res += ':'
        res += self.line_break(2)
        for sline in self.class_lines:
            res += self.ident() + sline
            res += self.line_break(1)
        for sclass in self.sub_class_list:
            res += sclass
            res += self.line_break(2)
        for funct in self.function_list:
            res += funct
            res += self.line_break(2)
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return others + self.__repr__()

    ''' print the python code '''
    def _print(self):
        print(self)

    '''return the python code as string'''
    def _return(self):
        return str(self)

'''
Class that generates the sublcass of python code
within another class.PyClass
'''
class PySubClass(PyClass):

    def __init__(self):
        self.ObjectType = "Class"
        self.name =''
        self.inhnerit_list = []
        self.sub_class_list = []
        self.function_list= []
        self.class_lines = []
        self.sub_clPyClassass_list = []

    def __repr__(self):
        res = self.line_break(1)
        res += self.ident() + "class %s"%(self.name, )
        for pos, inheritance in enumerate(self.inhnerit_list):
            if pos == 0:
                res += '('
            if pos > 0:
                res += ', '
            res += inheritance
        if self.inhnerit_list:
            res += ')'
        res += ':'
        res += self.line_break(1)
        for sline in self.class_lines:
            res += self.ident(2) + sline
            res += self.line_break(1)
        for sclass in self.sub_clPyClassass_list:
            res += sclass
            res += self.line_break(2)
        for funct in self.function_list:
            res += funct
            res += self.line_break(2)
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return other + self.__repr__()

    def _print(self):
         self

    def _return(self):
        return str(self)

'''
Class generates python code functions inside or outside a class
'''
class PyFunction:

    def __init__(self):
        self.ObjectType= "Function"
        self.static_method = '@staticmethod'
        self.name =   self.args = self.kwargs =  ''
        self.param_list = []
        self.function_lines = []
        self.in_class = False
        self.is_static = False

    def set_name(self, val):
        self.name = val

    def set_self(self):
        self.in_class = True

    def set_static(self):
        self.is_static = True

    def set_param(self, val):
        self.param_list.append(val)

    def add_line(self, val):
        self.function_lines.append(val)

    def ident(self, val=1):
        val2 = ' '
        return  ((4*val)*val2)

    def line_break(self, val):
        return val*'\n'

    def __repr__(self):
        if self.in_class:
            if self.is_static:
                res = self.ident() + self.static_method
                res += self.line_break(1)
                res += self.ident() + 'def %s(' % (self.name, )
            else:
                res = self.ident() + 'def %s(' % (self.name, )

            if len(self.param_list) > 0:
               res += 'self, '
            else:
               res += 'self'
        else:
            res = 'def %s('%(self.name, )
        for pos, params in enumerate(self.param_list):
            if pos > 0:
                res += ', '
            res += params
        res += '):'
        res += self.line_break(1)
        for f_line in self.function_lines:
            res += self.ident(2) +  f_line + self.line_break(1)
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return other + self.__repr__()

    def _print(self):
        print(self)

    def _return(self):
        return str(self)
        on_lines = []
        self.in_class = False
        self.is_static = False

    def set_name(self, val):
        self.name = val

    def set_self(self):
        self.in_class = True

    def set_static(self):
        self.is_static = True

    def set_param(self, val):
        self.param_list.append(val)

    def add_line(self, val):
        self.function_lines.append(val)

    def ident(self, val=1):
        val2 = ' '
        return  ((4*val)*val2)

    def line_break(self, val):
        return val*'\n'

    def __repr__(self):
        if self.in_class:
            if self.is_static:
                res = self.ident() + self.static_method
                res += self.line_break(1)
                res += self.ident() + 'def %s(' % (self.name, )
            else:
                res = self.ident() + 'def %s(' % (self.name, )

            if len(self.param_list) > 0:
               res += 'self, '
            else:
               res += 'self'
        else:
            res = 'def %s('%(self.name, )
        for pos, params in enumerate(self.param_list):
            if pos > 0:
                res += ', '
            res += params
        res += '):'
        res += self.line_break(1)
        for f_line in self.function_lines:
            res += self.ident(2) +  f_line + self.line_break(1)
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return other + self.__repr__()

    def _print(self):
        print(self)

    def _return(self):
        return str(self)

'''
Class generates python code modules inside or outside a class
'''
class PyModule:
    def __init__(self):
        self.ObjectType = "Module"
        self.module_lines = []
        self.dag_list = []
        self.is_top = True


    def set_not_top(self):
        self.is_top = False

    def add_line(self, val):
        if type(val) == int:
           self.module_lines.append(val*'\n')
        else:
           self.module_lines.append(val)

    def ident(self, val=1):
        val2 = ' '
        return ((4* val)*val2)

    def line_break(self, val):
        return val*'\n'

    def add_dag(self, val):
        self.dag_list.append(val)

    def __repr__(self):
        if self.is_top:
            res = '# -*- coding: utf-8 -*-'
            res += self.line_break(1)
        for line in self.module_lines:
            res += line + self.line_break(1)
        res += self.line_break(1)
        for dag in self.dag_list:
            res += dag
            res += self.line_break(2)

        return res

    def _print(self):
        print(self)

    def _return(self):
        return str(self)

'''
Class generates python code for an Airflow Dag
'''
class PyDag(PyClass):

    def __init__(self):
        self.ObjectType= "Dag"
        self.name =   self.args = self.kwargs =  ''
        self.param_list = {}
        self.param_list_obj = {}
        self.upstream_task = {}
        self.downstream_task = {}
        self.in_class = False
        self.is_static = False
        self.task_list =  []

    def set_self(self):
        self.in_class = True

    def set_param(self, val):
        self.param_list.update(val)

    def set_param_obj(self, val):
        self.param_list_obj.update(val)

    def ident(self, val=1):
        val2 = ' '
        return  ((4*val)*val2)

    def add_task(self, val):
        self.task_list.append(val)

    def set_downstream_task(self, task_id, val):
        self.downstream_task.update({task_id:val})

    def set_upstream_task(self, task_id, val):
        self.upstream_task.update({task_id:val})

    def __repr__(self):
        if self.in_class:
            if self.is_static:
                res = self.ident()
                res += self.line_break(1)
                res += self.ident() + "with DAG(self, dag_id='%s', default_args=args "% (self.name, )
            else:
                res = self.ident() + "with DAG(self, dag_id='%s', default_args=args "% (self.name, )
        else:
            res = "with DAG(dag_id='%s', default_args=args "%(self.name, )
        for key, value in self.param_list.items():
            if type(value) in (str,):
                res += ", {}='{}'".format(key, value)
            else:
                res += ", {}={}".format(key, value)
        for key, value in self.param_list_obj.items():
            res += ", {}={}".format(key, value)
        res += ') as dag:'
        res += self.line_break(1)
        res += self.line_break(1)
        #adds tasks
        for task in self.task_list:
            res += task
            res += self.line_break(2)
        #adds relationships
        for task_id, related_tasks in self.downstream_task.items():
            res += '{}.set_downstream({})'.format(task_id, related_tasks)
            res += self.line_break(1)
        for task_id, related_tasks in self.upstream_task.items():
            res += '{}.set_upstream({})'.format(task_id, related_tasks)
            res += self.line_break(1)
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return other + self.__repr__()

    def _print(self):
        print(self)

    def _return(self):
        return str(self)

'''
Class generates python code for Dags Task
'''
class DagTask(PyClass):

    def __init__(self):
        self.ObjectType= "Dag"
        self.name =  self.var_name = self.var_name = self.args = self.kwargs =  ''
        self.operator = self.task_id = ''
        self.param_dict = {}
        self.decorator_list = []
        self.in_class = self.set_context = self.set_mode = False


    def set_name(self, val):
        self.name= val

    def set_self(self):
        self.in_class = True

    def set_param(self, val):
        self.param_dict.update(val)

    def ident(self, val=1):
        val2 = ' '
        return  ((4*val)*val2)

    def set_operator(self, val):
        self.operator = val

    def set_decorator(self, val):
        self.decorator_list.append(val)

    def set_task_id(self, val):
        self.task_id = val
        self.var_name= 'do_{}'.format(val)

    def set_current_context(self):
        self.set_context = True

    def set_mode(self, val):
        self.mode = val
        self.set_mode = True

    def __repr__(self):
        if self.in_class:
            res = self.ident(3)
            res += self.line_break(1)
            for decorator in self.decorator_list:
                res += self.ident(3) + '@{}'.format(decorator)
                res += self.line_break(1)
            res += self.ident(3) + '{} = {}(self,'.format(self.var_name, self.operator)
            res += self.line_break(1)
            res += self.ident(4) + "name ='{}',".format(self.name)
            res += self.line_break(1)
            res += self.ident(4) + "task_id ='{}', ".format(self.task_id)
            if self.set_context:
                res += self.ident(4) + 'context = get_current_context(), '
                res += self.line_break(1)
            if set_mode:
                res += self.ident(4) + 'mode = {}, '.format(self.mode)
                res += self.line_break(1)
        else:
            res = ''
            for decorator in self.decorator_list:
                res += self.ident() + '@{}'.format(decorator)
                res += self.line_break(1)
            res += self.ident() + '{} = {}('.format(self.var_name, self.operator, self.name, self.task_id)
            res += self.line_break(1)
            res += self.ident(2) + "name ='{}',".format(self.name)
            res += self.line_break(1)
            res += self.ident(2) + "task_id ='{}', ".format(self.task_id)
            if self.set_context:
                res += self.ident(2) + 'context = get_current_context(), '
                res += self.line_break(1)
            if self.set_mode:
                res += self.ident(2) + 'mode = {}, '.format(self.mode)
                res += self.line_break(1)
            res += self.line_break(1)
        if not self.param_dict.items():
            res += self.ident(2) + 'params = params '
        for key, value in self.param_dict.items():
            if key in ('upstream_task_id','downstream_task_id'):
                continue
            if type(value) == str:
                res += self.ident(2) + "{} = '{}'".format(key, value)
            else:
                res += self.ident(2) + '{} = {}'.format(key, value)
            res += self.line_break(1)
        res += self.line_break(1)
        res += self.ident() + ')'
        return res

    def __add__(self, other):
        return self.__repr__() + other

    def __radd__(self, other):
        return other + self.__repr__()

    def _print(self):
        print(self)

    def _return(self):
        return str(self)



if __name__ == '__main__':
    print('entra')
